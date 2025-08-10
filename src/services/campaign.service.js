// src/services/campaign.service.js
const { getDataSource } = require('../data-source');
const { Campaigns } = require('../../build/entities/Campaigns');
const { Messages }  = require('../../build/entities/Messages');
const { Between }   = require('typeorm');

// 1) Crear campaña: SOLO registro de campaña (status=1), NO mensajes
async function createCampaign({ name, message, recipients }) {
  if (!Array.isArray(recipients) || recipients.length === 0) {
    const err = new Error('recipients debe ser un arreglo con al menos 1 número');
    err.status = 400;
    throw err;
  }

  const ds = await getDataSource();
  const campaignRepo = ds.getRepository(Campaigns);

  const today = new Date(); // puedes exponer processDate/processHour si lo necesitas
  const entity = campaignRepo.create({
    userId: 1,              // por ahora fijo (no hay usuarios)
    messageText: message,
    phoneList: recipients.map(p => String(p).trim()).join(','), // guardamos la lista para el "dispatch"
    processStatus: 1,       // 1: pendiente (sin mensajes)
    processDate: today.toISOString().slice(0,10), // 'YYYY-MM-DD'
    processHour: today
  });

  const saved = await campaignRepo.save(entity);
  return saved.id;
}

// 2) Enviar campaña: crea mensajes si aún no existen, avanza estado 2 -> simula envíos -> estado 3
async function dispatchCampaign(campaignId) {
  const ds = await getDataSource();
  const campaignRepo = ds.getRepository(Campaigns);
  const messageRepo  = ds.getRepository(Messages);

  return ds.transaction(async (manager) => {
    // Traer campaña con lock para evitar dobles envíos en paralelo
    const campaign = await manager.getRepository(Campaigns).findOne({
      where: { id: campaignId },
      lock: { mode: 'pessimistic_write' }
    });
    if (!campaign) {
      const err = new Error('Campaña no encontrada');
      err.status = 404;
      throw err;
    }

    // Si está en 1 (pendiente), generar mensajes (status 1)
    if (campaign.processStatus === 1) {
      const phones = (campaign.phoneList || '')
        .split(',')
        .map(p => p.trim())
        .filter(Boolean);

      const toCreate = phones.map(phone => {
        return manager.getRepository(Messages).create({
          campaign,                 // relación
          campaignId: campaign.id,  // FK (opcional, por si lo usas)
          phone,
          text: campaign.messageText,
          shippingStatus: 1,        // 1: pendiente
          processDate: campaign.processDate,
          processHour: new Date()
        });
      });

      if (toCreate.length === 0) {
        const err = new Error('La campaña no tiene números válidos para enviar');
        err.status = 400;
        throw err;
      }

      await manager.save(toCreate);
    }

    // Marcar campaña “en proceso”
    if (campaign.processStatus !== 2) {
      await manager.update(Campaigns, { id: campaign.id }, { processStatus: 2 });
    }

    // Simular envío: 90% enviados (2), 10% error (3)
    const msgs = await manager.getRepository(Messages).find({
      where: { campaign: { id: campaign.id } },
      select: ['id', 'shippingStatus']
    });

    let sent = 0, failed = 0;
    for (const m of msgs) {
      const newStatus = Math.random() < 0.9 ? 2 : 3;
      if (newStatus === 2) sent++; else failed++;
      await manager.update(Messages, { id: m.id }, { shippingStatus: newStatus, processHour: new Date() });
    }

    // Finalizada (3) cuando todos sean 2 o 3 (ya lo son tras la simulación)
    await manager.update(Campaigns, { id: campaign.id }, { processStatus: 3 });

    return { ok: true, total: msgs.length, sent, failed };
  });
}

// 3) Listar campañas por rango de fechas (usa processDate: DATE)
async function listCampaigns({ from, to }) {
  const ds = await getDataSource();
  const repo = ds.getRepository(Campaigns);

  const where = {};
  if (from && to) {
    where.processDate = Between(from, to); // 'YYYY-MM-DD'
  } else if (from) {
    where.processDate = Between(from, from);
  } else if (to) {
    where.processDate = Between(to, to);
  }

  return repo.find({
    where,
    order: { id: 'DESC' },
    select: ['id', 'name', 'processStatus', 'processDate', 'processHour', 'phoneList', 'messageText']
  });
}

// 4) Listar mensajes por campaña
async function listCampaignMessages(id) {
  const ds = await getDataSource();
  return ds.getRepository(Messages).find({
    where: { campaign: { id } },
    order: { id: 'DESC' },
    select: ['id', 'phone', 'text', 'shippingStatus', 'processDate', 'processHour']
  });
}

module.exports = { createCampaign, dispatchCampaign, listCampaigns, listCampaignMessages };
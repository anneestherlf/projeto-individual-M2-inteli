const earningsService = require('../services/earningsService');

const getAllEarnings = async (req, res) => {
  try {
    const earnings = await earningsService.getAllEarnings();
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEarningById = async (req, res) => {
  try {
    const earning = await earningsService.getEarningById(Number(req.params.id));
    if (earning) {
      res.status(200).json(earning);
    } else {
      res.status(404).json({ error: 'Ganho não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEarning = async (req, res) => {
  try {
    const { value_earning, description_earning, date_earning, category_earning, user_id_FK } = req.body;
    if (
      typeof value_earning !== 'number' ||
      typeof description_earning !== 'string' ||
      !date_earning ||
      typeof category_earning !== 'string' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    const newEarning = await earningsService.createEarning({
      value_earning,
      description_earning,
      date_earning,
      category_earning,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newEarning);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEarningsByUserId = async (req, res) => {
  try {
    const earnings = await earningsService.getEarningsByUserId(Number(req.params.user_id));
    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEarnings,
  getEarningById,
  createEarning,
  getEarningsByUserId
};
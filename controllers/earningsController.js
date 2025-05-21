// Importa o serviço responsável pela lógica dos ganhos (earnings)
const earningsService = require('../services/earningsService');

// Controlador para buscar todos os ganhos
const getAllEarnings = async (req, res) => {
  try {
    const earnings = await earningsService.getAllEarnings();
    res.status(200).json(earnings); // Retorna todos os ganhos em formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar um ganho pelo ID
const getEarningById = async (req, res) => {
  try {
    // Busca o ganho pelo ID passado na URL
    const earning = await earningsService.getEarningById(Number(req.params.id));
    if (earning) {
      res.status(200).json(earning); // Ganho encontrado
    } else {
      res.status(404).json({ error: 'Ganho não encontrado' }); // Ganho não existe
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para criar um novo ganho
const createEarning = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { value_earning, description_earning, date_earning, category_earning, user_id_FK } = req.body;
    // Valida se todos os campos obrigatórios foram fornecidos e são válidos
    if (
      typeof value_earning !== 'number' ||
      typeof description_earning !== 'string' ||
      !date_earning ||
      typeof category_earning !== 'string' ||
      !user_id_FK
    ) {
      return res.status(400).json({ error: 'Dados obrigatórios não fornecidos ou inválidos' });
    }
    // Cria o novo ganho usando o serviço
    const newEarning = await earningsService.createEarning({
      value_earning,
      description_earning,
      date_earning,
      category_earning,
      user_id_FK: Number(user_id_FK)
    });
    res.status(201).json(newEarning); // Retorna o ganho criado
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Controlador para buscar todos os ganhos de um usuário específico
const getEarningsByUserId = async (req, res) => {
  try {
    const earnings = await earningsService.getEarningsByUserId(Number(req.params.user_id));
    res.status(200).json(earnings); // Retorna os ganhos do usuário
  } catch (error) {
    res.status(500).json({ error: error.message }); // Erro interno do servidor
  }
};

// Exporta os métodos do controlador para uso nas rotas
module.exports = {
  getAllEarnings,
  getEarningById,
  createEarning,
  getEarningsByUserId
};
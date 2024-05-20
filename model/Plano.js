const mongoose    = require('mongoose');
const planoSchema = mongoose.Schema({
    mensalidade: Number,
    redes_de_academia: String,

    descricao: {
        modalidade:       String,
        avaliacao_fisica: String,
        nutricionista:    String,
        personal_trainer: String,
        produtos_Growth:  String

    }
});

const planoModel = mongoose.model('plano', planoSchema);
module.exports = {planoModel, planoSchema}
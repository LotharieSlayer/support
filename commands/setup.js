const { setupSupport } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("support")
        .setDescription(
            "Définir/Supprimer le channel pour le support. (Il ne peut n'y en avoir qu'un)"
        )
        .addChannelOption((channel) =>
            channel
                .setName("input_channel")
                .setDescription(
                    "Entrez le channel où les demandes de support se font."
                )
                .setRequired(true)
        )
        .addStringOption((string) =>
            string
                .setName("output_guild_id")
                .setDescription(
                    "Entrez l'ID du serveur où les demandes de support seront envoyés pour le staff."
                )
                .setRequired(true)
        )
        .addStringOption((string) =>
            string
                .setName("output_channel_id")
                .setDescription(
                    "Entrez l'ID du channel où les demandes de support seront envoyés pour le staff."
                )
                .setRequired(true)
        )
    );
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "support":
            // eslint-disable-next-line no-case-declarations
            const inputChannelSupport =
                interaction.options.getChannel("input_channel");
            // eslint-disable-next-line no-case-declarations
            const outputGuildSupport =
                interaction.options.getString("output_guild_id");
            // eslint-disable-next-line no-case-declarations
            const outputChannelSupport =
                interaction.options.getString("output_channel_id");
            setupSupport.set(interaction.guild.id, [
                inputChannelSupport.id,
                outputGuildSupport,
                outputChannelSupport,
            ]);
            await interaction.reply({
                content: `Channel des demandes de support ajouté au serveur dans <#${inputChannelSupport.id}> !\nOutput du serveur dans <#${outputChannelSupport}>.`,
                ephemeral: true,
            });
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};

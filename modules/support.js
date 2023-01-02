/**
 * @author Lothaire Guée
 * @description
 * 		Event contenant le restart et le process du service contest.
 */

/*      AUTHORISATION      */
const {
    ButtonStyle,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
} = require("discord.js");

/*      IMPORTS      */
const {
    setupSupport,
} = require("../utils/enmapUtils");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function supportNotify(thread, client) {
    const support = setupSupport.get(thread.guild.id);
    if (support == undefined) return;
    if (thread.parentId === support[0]) {

        // build component open link
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji("🔗")
                .setLabel("Lien du post")
                .setStyle(ButtonStyle.Link)
                .setURL(thread.url)
        );

        // fetch ownerId of this thread
        const threadOwner = await thread.guild.members.fetch(thread.ownerId);

        // build embed
        const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle(`Nouveau ticket dans le support`)
            .setURL(thread.url)
            .setAuthor({
                name: `${thread.name}`,
                iconURL: thread.guild.iconURL(),
            })
            .setDescription(
                `Un nouveau ticket de support a été ouvert avec le tag ${thread.appliedTags[0]} !`
            )
            .setTimestamp()
            .setFooter({
                text: `par ${threadOwner.user.username}`,
                iconURL: threadOwner.user.avatarURL(),
            });

        // Envoie de l'embed dans le serveur staff
        const outputGuild = await client.guilds.fetch(support[1]);
        const outputChannel = await outputGuild.channels.fetch(support[2]);
        await outputChannel.send({ embeds: [embed], components: [row] }).then((msg) => {
            msg.startThread({
                name: `Ticket de ${threadOwner.user.username}`,
                autoArchiveDuration: 60,
                reason: `Ticket de support`,
            });
        });
    }
}

module.exports = {
    supportNotify,
};

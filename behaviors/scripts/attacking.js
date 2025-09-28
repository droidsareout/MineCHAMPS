import { world, Entity } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((event) => {
    const dead = event.deadEntity;
    const attacker = event.damageSource.damagingEntity;
    const deaths = world.scoreboard.getObjective("deaths")
    const kills = world.scoreboard.getObjective("kills")
    const gold = world.scoreboard.getObjective("gold")
    const lifetimeGold = world.scoreboard.getObjective("lifetimeGold")
    
    if (dead.typeId !== "minecraft:player") return;

    deaths.addScore(dead, 1)

    if (attacker?.typeId === "minecraft:player") {
        const messages = [
            `§c${dead.name} §7was killed by §c${attacker.name}`,
            `§c${dead.name} §7was demolished by §c${attacker.name}`,
            `§c${attacker.name} §7sent §c${dead.name} §7into their grave`,
            `§c${attacker.name} §7destroyed §c${dead.name}`,
        ];
        const randomMessage = messages[Math.floor(Math.random() * (messages.length))];

        world.sendMessage(randomMessage);

        kills.addScore(attacker, 1)
        gold.addScore(attacker, 2)
        lifetimeGold.addScore(attacker, 2)
        attacker.onScreenDisplay.setTitle("  ");
        attacker.onScreenDisplay.updateSubtitle("§g+2 Gold §7(kill)");
        attacker.playSound("random.orb");
    } else if (attacker instanceof Entity) {
        let name = attacker.typeId.replace("minecraft:", "");
        world.sendMessage(`§c${dead.name} §7died to a §c${name.charAt(0).toUpperCase() + name.slice(1)}`);
    } else {
        world.sendMessage(`§c${dead.name} §7died to a §cnon-player`);
    };
});
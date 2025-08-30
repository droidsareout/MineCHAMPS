import { system, world, GameMode } from "@minecraft/server";

system.runInterval(() => {
    const dimension = world.getDimension("overworld");
    
    world.getPlayers().forEach((player) => {
        if (player.hasTag("inGame")) return;
        if (player.getGameMode() === GameMode.Creative || player.getGameMode() === GameMode.Spectator) return;

        player.addEffect("resistance", 100, { amplifier: 255, showParticles: false});
        player.addEffect("saturation", 100, { amplifier: 255, showParticles: false});
    });
    
    dimension.getEntities({ typeId: "minecraft:iron_golem" }).forEach((entity) => {
        entity.addEffect("instant_health", 60, {amplifier: 255, showParticles: false})
    });
});
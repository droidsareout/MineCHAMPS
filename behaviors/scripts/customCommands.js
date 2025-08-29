import { 
    BlockComponentRandomTickEvent,
    BlockVolume, 
    CommandPermissionLevel, 
    CustomCommandParamType, 
    CustomCommandStatus, 
    EntityComponentTypes, 
    EquipmentSlot, 
    GameMode, 
    ScriptEventSource, 
    system, 
    world
} from "@minecraft/server";

import { ActionFormData } from "@minecraft/server-ui";

system.beforeEvents.startup.subscribe(event => {
    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:spawn",
            description: "Return to spawn",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (origin) => {
            if (origin.sourceEntity.hasTag("inGame")) {
                system.run(() => origin.sourceEntity.playSound("random.break"));
                origin.sourceEntity.sendMessage("§vYou cannot return to spawn while in game!");
            
                return { status: CustomCommandStatus.Success };
            } else if (origin.sourceEntity.hasTag("spectatingGame")) {
                system.run(() => {
                    origin.sourceEntity.removeTag("spectatingGame")
                    origin.sourceEntity.setGameMode(GameMode.Adventure);
                    origin.sourceEntity.teleport({ x: 0.50, y: -59, z: 0.50 }, { facingLocation: { x: 0.50, y: -59, z: 1.50} })
                });
                system.runTimeout(() => origin.sourceEntity.playSound("mob.endermen.portal"), 1);
                origin.sourceEntity.sendMessage("§gExcited spectator.");

                return { status: CustomCommandStatus.Success };
            } else {
                system.run(() => origin.sourceEntity.teleport({ x: 0.50, y: -59, z: 0.50 }, { facingLocation: { x: 0.50, y: -59, z: 1.50} }));
                system.runTimeout(() => origin.sourceEntity.playSound("mob.endermen.portal"), 1);
                origin.sourceEntity.sendMessage("§gTeleported to spawn.");

                return { status: CustomCommandStatus.Success };
            }
        }
    );

    event.customCommandRegistry.registerCommand(
        {
            name: "minechamps:discord",
            description: "Get the link to the discord server",
            permissionLevel: CommandPermissionLevel.Any,
        },
        (origin) => {
            system.run(() => origin.sourceEntity.sendMessage("§gMineCHAMPS Discord server code: §dUyJtnkyUfE"));

            return { status: CustomCommandStatus.Success };
        }
    );
});
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
                origin.sourceEntity.sendMessage("§cYou cannot return to spawn while in game!");
            
                return { status: CustomCommandStatus.Success };
            };
            
            system.run(() => {
                origin.sourceEntity.teleport({
                    x: 0.50, y: -59, z: 0.50, 
                }, { facingLocation: {
                    x: 0.50, y: -59, z: 1.50,
                } });
            
                origin.sourceEntity.sendMessage("§aSuccessfully teleported to spawn.");
                //system.runTimeout(origin.sourceEntity.playSound("mob.endermen.portal"), 1)
            });
            
            return { status: CustomCommandStatus.Success };
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
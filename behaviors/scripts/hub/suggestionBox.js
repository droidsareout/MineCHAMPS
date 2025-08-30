import { world, system, ItemStack, Entity } from "@minecraft/server";

world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    const { player } = event;
    if (event.block.typeId === "minecraft:jukebox") {
        const inventory = player.getComponent("minecraft:inventory");
        const mainHandSlot = inventory.container.getItem(player.selectedSlotIndex);
    
        if (
            mainHandSlot?.typeId === "minecraft:lodestone_compass" &&
            mainHandSlot?.nameTag === "§r§u§lMENU §r§7[USE]"
          ) return;
          
        event.cancel = true;
        
        system.run(() => {
            const suggestionBook = new ItemStack("minecraft:writable_book", 1);
            suggestionBook.nameTag = "§r§nSuggestion Book"

            for (let i = 0; i < inventory.container.size; i++) {
              if (
                inventory.container.getItem(i)?.typeId === "minecraft:writable_book" && 
                inventory.container.getItem(i)?.nameTag === "§r§nSuggestion Book"
                ) {
                player.sendMessage("§vYou can only grab one §nSuggestion Book§v at a time.");
                player.playSound("random.break");
                return;
              }
            }

            player.sendMessage("§gYou've been given a §nSuggestion Book§g.");
            player.playSound("random.orb");
            inventory.container.addItem(suggestionBook);
        });
    }
});
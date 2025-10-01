import { world, system, GameMode } from "@minecraft/server";

world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
  const { block, itemStack, player } = data;

  if (player.getGameMode() != GameMode.Adventure) return;

  if (
    block.location.x == 16 &&
    block.location.y == 102 &&
    block.location.z == 35
  )
    return;

  if (itemStack)
    if (
      itemStack.typeId.includes("axe") ||
      itemStack.typeId.includes("hoe") ||
      itemStack.typeId.includes("shovel") ||
      itemStack.typeId.includes("bucket") ||
      itemStack.typeId.includes("bone_meal")
    )
      return (data.cancel = true);

  if (
    block.typeId.includes("bed") ||
    block.typeId.includes("pot") ||
    block.typeId.includes("chest") ||
    block.typeId.includes("barrel") ||
    block.typeId.includes("shulker_box") ||
    block.typeId.includes("crafting_table") ||
    block.typeId.includes("furnace") ||
    block.typeId.includes("brewing_stand") ||
    block.typeId.includes("dragon_egg")
  )
    return (data.cancel = true);
});

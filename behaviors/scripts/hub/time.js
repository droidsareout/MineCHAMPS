import { world, system } from "@minecraft/server";

system.runInterval(() => {
  const time = world.getTimeOfDay();
  const dimension = world.getDimension("overworld");

  try {
    if (time >= 18000 && time <= 24000) {
      //midnight to sunrise
      dimension.setBlockType({ x: 41, y: -58, z: 70 }, "minecraft:air");
      dimension.setBlockType({ x: 41, y: -58, z: 71 }, "minecraft:air");
      dimension.setBlockType({ x: 41, y: -58, z: 72 }, "minecraft:air");
      dimension.setBlockType({ x: 41, y: -59, z: 70 }, "minecraft:air");
      dimension.setBlockType({ x: 41, y: -59, z: 71 }, "minecraft:air");
      dimension.setBlockType({ x: 41, y: -59, z: 72 }, "minecraft:air");
    } else if (time >= 13000 && time <= 24000) {
      //night to sunrise
      dimension.runCommand(`setblock 46 -43 -12 waxed_copper_bulb["lit"=true]`);
      dimension.runCommand(`setblock 59 -43 -11 waxed_copper_bulb["lit"=true]`);
      dimension.runCommand(`setblock -49 -44 57 waxed_copper_bulb["lit"=true]`);
      dimension.runCommand(`setblock -47 -42 62 waxed_copper_bulb["lit"=true]`);
      dimension.runCommand(`setblock 25 -44 105 waxed_copper_bulb["lit"=true]`);
    } else {
      //day
      dimension.setBlockType({ x: 41, y: -58, z: 70 }, "minecraft:iron_bars");
      dimension.setBlockType({ x: 41, y: -58, z: 71 }, "minecraft:iron_bars");
      dimension.setBlockType({ x: 41, y: -58, z: 72 }, "minecraft:iron_bars");
      dimension.setBlockType({ x: 41, y: -59, z: 70 }, "minecraft:iron_bars");
      dimension.setBlockType({ x: 41, y: -59, z: 71 }, "minecraft:iron_bars");
      dimension.setBlockType({ x: 41, y: -59, z: 72 }, "minecraft:iron_bars");

      dimension.runCommand(
        `setblock 46 -43 -12 waxed_copper_bulb["lit"=false]`,
      );
      dimension.runCommand(
        `setblock 59 -43 -11 waxed_copper_bulb["lit"=false]`,
      );
      dimension.runCommand(
        `setblock -49 -44 57 waxed_copper_bulb["lit"=false]`,
      );
      dimension.runCommand(
        `setblock -47 -42 62 waxed_copper_bulb["lit"=false]`,
      );
      dimension.runCommand(
        `setblock 25 -44 105 waxed_copper_bulb["lit"=false]`,
      );
    }
  } catch (error) {
    console.log(error.message);
  }
});

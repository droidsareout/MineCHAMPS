# Player offline removal
scoreboard players reset * killsDisplay
execute as @a run scoreboard players operation @s killsDisplay = @s kills

scoreboard players reset * deathsDisplay
execute as @a run scoreboard players operation @s deathsDisplay = @s deaths

scoreboard players reset * winsDisplay
execute as @a run scoreboard players operation @s winsDisplay = @s wins

scoreboard players reset * goldDisplay
execute as @a run scoreboard players operation @s goldDisplay = @s gold
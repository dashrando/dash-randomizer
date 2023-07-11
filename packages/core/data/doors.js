import area from "../data/areas";
import boss from "../data/bosses";

const DOORS = [
  {
    door: "Door_KraidBoss",
    from: "right",
    to: "left",
    address: boss.DoorToKraidBoss,
    aligned: boss.DoorVectorToPreKraid,
    misaligned: boss.DoorVectorTeleportToPreKraid,
  },
  {
    door: "Exit_Kraid",
    from: "left",
    to: "right",
    address: boss.DoorFromKraidRoom,
    aligned: boss.DoorVectorToKraid,
    misaligned: boss.DoorVectorTeleportToKraid,
  },
  {
    door: "Door_PhantoonBoss",
    from: "right",
    to: "left",
    address: boss.DoorToPhantoonBoss,
    aligned: boss.DoorVectorToPrePhantoon,
    misaligned: boss.DoorVectorTeleportToPrePhantoon,
  },
  {
    door: "Exit_Phantoon",
    from: "left",
    to: "right",
    address: boss.DoorFromPhantoonRoom,
    aligned: boss.DoorVectorToPhantoon,
    misaligned: boss.DoorVectorTeleportToPhantoon,
  },
  {
    door: "Door_DraygonBoss",
    from: "left",
    to: "right",
    address: boss.DoorToDraygonBoss,
    aligned: boss.DoorVectorToPreDraygon,
    misaligned: boss.DoorVectorTeleportToPreDraygon,
  },
  {
    door: "Exit_Draygon",
    from: "right",
    to: "left",
    address: boss.DoorFromDraygonRoom,
    aligned: boss.DoorVectorToDraygon,
    misaligned: boss.DoorVectorTeleportToDraygon,
  },
  {
    door: "Door_RidleyBoss",
    from: "left",
    to: "right",
    address: boss.DoorToRidleyBoss,
    aligned: boss.DoorVectorToPreRidley,
    misaligned: boss.DoorVectorTeleportToPreRidley,
  },
  {
    door: "Exit_Ridley",
    from: "right",
    to: "left",
    address: boss.DoorFromRidleyRoom,
    aligned: boss.DoorVectorToRidley,
    misaligned: boss.DoorVectorTeleportToRidley,
  },
];

export default DOORS;

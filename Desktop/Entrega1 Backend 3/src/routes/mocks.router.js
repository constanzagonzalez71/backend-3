import { Router } from "express";
import { generateMockUsers } from "../utils/mockingUsers.js";
import { generateMockPets } from "../utils/mockingPets.js";
import { usersService, petsService } from "../services/index.js";

const router = Router();

/**
 * GET /api/mocks/mockingpets
 * (endpoint migrado)
 */
router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(100);
  res.send({ status: "success", payload: pets });
});

/**
 * GET /api/mocks/mockingusers
 */
router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.send({ status: "success", payload: users });
});

/**
 * POST /api/mocks/generateData
 */
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).send({ status: "error", error: "Missing params" });
    }

    const mockUsers = generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    for (const user of mockUsers) {
      await usersService.create(user);
    }

    for (const pet of mockPets) {
      await petsService.create(pet);
    }

    res.send({
      status: "success",
      message: "Data generated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default router;

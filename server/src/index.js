import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema.js";
import { PrismaClient } from "../src/generated/prisma-client-js/index.js";

const prisma = new PrismaClient();

const server = createServer({ schema: schema, context: { prisma } });

server.start();

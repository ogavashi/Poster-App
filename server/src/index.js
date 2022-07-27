import { createPubSub, createServer } from "@graphql-yoga/node";
import { schema } from "./schema.js";
import { PrismaClient } from "../src/generated/prisma-client-js/index.js";

const prisma = new PrismaClient();

const pubsub = createPubSub();

const server = createServer({ schema: schema, context: { prisma, pubsub } });

server.start();

/**
 * Type of both player and bot
 */
interface Actor {
  currentMatches: number;
}

export type ActorType = "player" | "bot";

export default Actor;

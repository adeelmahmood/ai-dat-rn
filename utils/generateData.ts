import { Match } from "@/types";
import { faker } from "@faker-js/faker";

export const generateSampleMatches = (): Match[] => {
    return new Array(50)
        .fill(null)
        .map(
            (_) =>
                <Match>{
                    id: faker.string.uuid(),
                    username: faker.internet.userName(),
                    image: faker.image.avatar(),
                    isOnline: Math.random() < 0.5,
                    lastMessage: faker.lorem.sentence(),
                    lastMessageTime: faker.date.recent(),
                }
        )
        .sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime());
};

export default { generateSampleMatches };

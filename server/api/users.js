
const users = [{id: 1, username: "Vasya", age: 23}];

export async function getAllUsers(root, args, ctx, info) {
    return users;
}

export async function getUser(root, args, ctx, info) {
    const id = root.input.id;
    return users.find(user => user.id == id);
}

export async function createUser(root, args, ctx, info) {
    const createUser = (input) => {
        const id = Date.now();
        return {
            id, ...input
        }
    }
    const user = createUser(root.input);
    users.push(user);
    return user;
}
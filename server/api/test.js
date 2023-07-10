

export async function testGraphQl(root) {
    let error = "";

    if(root.name != "Andrei" || root.surname != "Bozu") {
        error = "Not a valid student"
    }

    const Student = {
        "name": root.name,
        "surname": root.surname,
        "group": root.group,
        "error": error
    }

    return Student;
}
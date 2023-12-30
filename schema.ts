export const typeDefs = `#graphql 

    scalar Date

    type Note{
        id : String,
        title : String, 
        body: String,
        active : Boolean,
        createdAt : Date
    }

    input NewNote{
        title : String,
        body: String
    }

    input UpdateNote{
        title: String,
        body : String,
        noteId : String
    }

    input UserData{
        username : String,
        password : String
    }

    type Query{
        getAllNotes: [Note]
        getNote(id: String!): Note
    }
    
    type Mutation{
        addUser(input: UserData): Boolean
        loginUser(input: UserData) : String

        addNote(input: NewNote): Boolean
        deleteNote(input: String): Boolean
        updateNote(input: UpdateNote): Boolean
    }
`;

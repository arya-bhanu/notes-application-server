export const typeDefs = `#graphql 

    scalar Date

    type Game{
        id : String,
        title : String
    }

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


    input UserData{
        username : String,
        password : String
    }

    type Query{
        games : [Game]
        getAllNotes: [Note]
    }
    
    type Mutation{
        addUser(input: UserData): Boolean
        loginUser(input: UserData) : String
        addNote(input: NewNote): Boolean
    }
`;

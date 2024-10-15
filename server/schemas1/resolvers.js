// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        me: async(parent,args,context) => {
            if(context.user) {
            const foundUser = await User.findOne({
                _id: context.user._id
            });

            return foundUser
        }
        throw AuthenticationError;
        },
  
    },
    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        addUser: async( parent, args)=> {
            const user = await User.create(args);
            const token = signToken(user);
           return { token, user };
        },
        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        // {body} is destructured req.body
        login: async (parent,args ) => {
            const user = await User.findOne({ email: args.email});
            if (!user) {
                 throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(args.password);

            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        // user comes from `req.user` created in the auth middleware function
        saveBook: async(parent, args, context)=> {
            console.log(context.user);
            if (context.user) {
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args.bookInput } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                } catch (err) {
                    console.log(err);
                    return err
                }

            }
            throw AuthenticationError;
        },
        // remove a book from `savedBooks`
        removeBook: async(parent, args, context)=> {
            if (context.user){
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );
                if (!updatedUser) {
                    throw AuthenticationError;
                }
                return updatedUser;
            }
            throw AuthenticationError;
        },
  
    }

};


module.exports = resolvers;

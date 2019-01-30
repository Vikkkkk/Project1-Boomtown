const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
const authMutations = require('./auth');
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Upload: UploadScalar,
    Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    },

    User: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The User GraphQL type has two fields that are not present in the
       *  user table in Postgres: items and borrowed.
       *
       *  According to our GraphQL schema, these fields should return a list of
       *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
       *
       */
      // @TODO: Uncomment these lines after you define the User type with these fields
      async items({ id }, args, { pgResource }) {
        try {
          const userItems = await pgResource.getItemsForUser(id);
          return userItems;
        } catch (err) {
          throw new ApolloError(err);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          const borrowedItems = await pgResource.getBorrowedItemsForUser(id);
          return borrowedItems;
        } catch (err) {
          throw new ApolloError(err);
        }
      }
    },

    Item: {
      async itemowner(item, args, { pgResource }) {
        try {
          const itemOwner = await pgResource.getUserById(item.ownerid);
          return itemOwner;
        } catch (err) {
          throw new ApolloError(err);
        }
      },
      async tags(item, args, { pgResource }) {
        try {
          const itemTags = await pgResource.getTagsForItem(item.id);
          return itemTags;
        } catch (err) {
          throw new ApolloError(err);
        }
      },
      async borrower(item, arg, { pgResource }) {
        try {
          const borrower = await pgResource.getUserById(item.borrowerid);
          return borrower;
        } catch (err) {
          throw new ApolloError(err);
        }
      },
      async imageurl({ imageurl, imageid, mimetype, data }) {
        if (imageurl) return imageurl;
        if (imageid) {
          return `data:${mimetype};base64, ${data}`;
        }
      }
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, { pgResource }, info) {
        // const image = await image;
        // const user = await jwt.decode(pgResource.token, app.get('JWT_SECRET'));
        const user = { id: 1 };
        const newItem = await pgResource.saveNewItem({
          item: args.item,
          // image: args.image,
          user
        });
        return newItem;
      }
    }
  };
};

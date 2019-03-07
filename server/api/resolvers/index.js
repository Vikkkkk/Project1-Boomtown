const { ApolloError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const authMutations = require('./auth');

const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Date: DateScalar,

    Query: {
      viewer(root, args, { token }) {
        if (token) {
          console.log(token);
          console.log(jwt.decode(token, app.get('JWT_SECRET')));
          return jwt.decode(token, app.get('JWT_SECRET'));
        }
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
    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, { pgResource, token }) {
        try {
          const user = await jwt.decode(token, app.get('JWT_SECRET'));

          const newItem = await pgResource.saveNewItem({
            item: args.item,
            user
          });
          return newItem;
        } catch (e) {
          console.log(e);
          throw 'error adding item';
        }
      }
    },

    User: {
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
        try {
          if (imageurl) return imageurl;
          if (imageid) {
            return `data:${mimetype};base64, ${data}`;
          }
        } catch (e) {
          console.log(e);
          throw 'error with image url';
        }
      }
    }
  };
};

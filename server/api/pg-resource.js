function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ name, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *',
        values: [name, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        console.log(e);
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
   
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
  
      const findUserQuery = {
        text: 'SELECT id,email, name AS fullname, bio FROM users WHERE id = $1',
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
      
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items ${idToOmit ? 'WHERE ownerid <> $1' : ''}`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (e) {
       
        throw 'Cannot get Item';
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw "Can't get item for user";
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw "Can't get borrowed items for user";
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query({
          text: 'SELECT id, name AS title  FROM tags'
        });
        return tags.rows;
      } catch (e) {
        throw "can't get tags";
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT name AS title,id FROM tags WHERE id IN (SELECT tagid FROM itemtags WHERE itemid = $1)`,
          values: [id]
        };

        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw "Can't get tags for item";
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description } = item;

              console.log(user);
              const newItemQuery = {
                text: `INSERT INTO items(title,description,ownerid) VALUES ($1,$2,$3) RETURNING *`,
                values: [title, description, user.id]
              };

              const insertNewItem = await postgres.query(newItemQuery);
              const tagRelationshipQuery = {
                text: `INSERT INTO itemtags(tagid,itemid) VALUES ${tagsQueryString(
                  [...tags],
                  insertNewItem.rows[0].id,
                  ''
                )} `,
                values: tags.map(tag => tag.id)
              };

              await postgres.query(tagRelationshipQuery);

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(insertNewItem.rows[0]);
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};

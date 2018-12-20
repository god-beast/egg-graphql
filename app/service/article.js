'use strict';
const Service = require('egg').Service;
const _       = require('lodash');
class ArticleService extends Service {
  /**
   * Promise to fetch all articles.
   *
   * @return {Promise}
   */

  async fetchAll(query) {
    
    let jump        = (query.limit-0)*(query.page-1);
    let searchQuery = {
      userId    : {"$in":query.userId},
      createTime: query.createTime
    }
    // if(userList.length==0){
    //    searchQuery.userId=query.;
    // }
    if(!query.createTime){
      delete searchQuery.createTime;
    }
    // console.log(searchQuery);

    let list = await this.ctx.model.Article
    .find(searchQuery).sort('-createTime').skip(jump).limit(query.limit-0).exec();
    let total = await this.ctx.model.Article.find(searchQuery).sort('-createTime')
    .count();
    return {list,total}
  }

  /**
   * Promise to fetch a/an article.
   *
   * @return {Promise}
   */

  fetch(params) {
    // Select field to populate.
    const populate = this.ctx.model.Article.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return this.ctx.model.Article
      .findOne(_.pick(params, _.keys(this.ctx.model.Article.schema.paths)))
      .populate(populate);
  }

  /**
   * Promise to count articles.
   *
   * @return {Promise}
   */

  async countUser(params) {
    // Convert `params` object to filters compatible with Mongo.
    // const filters = strapi.utils.models.convertParams('article', params);

    let result = await app.redis.get('users');
      // get
    return result;
  }

  /**
   * Promise to add a/an article.
   *
   * @return {Promise}
   */

  async add(params) {

    // Create relational data and return the entry.
    return this.ctx.model.Article.create({
      createTime  : params.createTime,
      departmentId: params.departmentId,
      content     : params.content,
      author      : params.author,
      userId      : params.userId,
    });
  }

  /**
   * Promise to edit a/an article.
   *
   * @return {Promise}
   */

  async edit(params, values) {
    // Extract values related to relational data.
    const relations = _.pick(values, this.ctx.model.Article.associations.map(a => a.alias));
    const data      = _.omit(values, this.ctx.model.Article.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await this.ctx.model.Article.update(params, data, {
      multi: true
    });

    // Update relational data and return the entry.
    return this.ctx.model.Article.updateRelations(Object.assign(params, {
      values: relations
    }));
  }

  /**
   * Promise to remove a/an article.
   *
   * @return {Promise}
   */

  async remove(params) {
    // Select field to populate.
    const populate = this.ctx.model.Article.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await this.ctx.model.Article
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      this.ctx.model.Article.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: data._id
          }                : {
          [association.via]: {
            $in: [data._id]
          }
        };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? {
          [association.via]: null
          }                : {
          $pull: {
            [association.via]: data._id
          }
        };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection]: 
          strapi.models[association.model || association.collection];

        return model.update(search, update, {
          multi: true
        });
      })
    );

    return data;
  }

  /**
   * Promise to search a/an article.
   *
   * @return {Promise}
   */

  async search(params) {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('article', params);
    // Select field to populate.
    const populate = this.ctx.model.Article.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(this.ctx.model.Article.attributes).reduce((acc, curr) => {
      switch (this.ctx.model.Article.attributes[curr].type) {
        case 'integer': 
        case 'float'  : 
        case 'decimal': 
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({
              [curr]: params._q
            });
          }

          return acc;
        case 'string'  : 
        case 'text'    : 
        case 'password': 
          return acc.concat({
            [curr]: {
              $regex  : params._q,
              $options: 'i'
            }
          });
        case 'boolean': 
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({
              [curr]: params._q === 'true'
            });
          }

          return acc;
        default: 
          return acc;
      }
    }, []);

    return this.ctx.model.Article
      .find({
        $or
      })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
}

module.exports = ArticleService;
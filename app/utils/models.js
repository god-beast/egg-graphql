export const convertParams = (entity, params) => {
    // 判断是否缺少模型名称
    if (!entity) {
        throw new Error('You can\'t call the convert params method without passing the model\'s name as a first argument.');
    }

    // Remove the source params (that can be sent from the ctm plugin) since it is not a filter
    // 删除源参数，因为这不属于过滤器的一种
    if (params.source) {
        delete params.source;
    }

    // 模型名称校准，兼容大小写
    const model = entity.toLowerCase();


    const models = _.assign(_.clone(strapi.models), Object.keys(strapi.plugins).reduce((acc, current) => {
        _.assign(acc, _.get(strapi.plugins[current], ['models'], {}));
        return acc;
    }, {}));

    if (!models.hasOwnProperty(model)) {
        return this.log.error(`The model ${model} can't be found.`);
    }

    const client = models[model].client;
    
    const connector = models[model].orm;

    if (!connector) {
        throw new Error(`Impossible to determine the ORM used for the model ${model}.`);
    }

    const convertor = strapi.hook[connector].load().getQueryParams;
    const convertParams = {
        where: {},
        sort: '',
        start: 0,
        limit: 100
    };

    _.forEach(params, (value, key) => {
        let result;
        let formattedValue;
        let modelAttributes = models[model]['attributes'];
        let fieldType;
        // Get the field type to later check if it's a string before number conversion
        if (modelAttributes[key]) {
            fieldType = modelAttributes[key]['type'];
        } else {
            // Remove the filter keyword at the end
            let splitKey = key.split('_').slice(0, -1);
            splitKey = splitKey.join('_');

            if (modelAttributes[splitKey]) {
                fieldType = modelAttributes[splitKey]['type'];
            }
        }
        // Check if the value is a valid candidate to be converted to a number value
        if (fieldType !== 'string') {
            formattedValue = isNumeric(value) ?
                _.toNumber(value) :
                value;
        } else {
            formattedValue = value;
        }

        if (_.includes(['_start', '_limit'], key)) {
            result = convertor(formattedValue, key);
        } else if (key === '_sort') {
            const [attr, order = 'ASC'] = formattedValue.split(':');
            result = convertor(order, key, attr);
        } else {
            const suffix = key.split('_');

            // Mysql stores boolean as 1 or 0
            if (client === 'mysql' && _.get(models, [model, 'attributes', suffix, 'type']) === 'boolean') {
                formattedValue = value === 'true' ? '1' : '0';
            }

            let type;

            if (_.includes(['ne', 'lt', 'gt', 'lte', 'gte', 'contains', 'containss', 'in'], _.last(suffix))) {
                type = `_${_.last(suffix)}`;
                key = _.dropRight(suffix).join('_');
            } else {
                type = '=';
            }

            result = convertor(formattedValue, type, key);
        }

        _.set(convertParams, result.key, result.value);
    });

    return convertParams;
}
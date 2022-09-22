const normalizr = require('normalizr');
const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;

// Data
const empresa = {
	id: '1000',
name: 'Dailyderm',
	gerente: {
		id: '2',
		name: 'John',
		lastname: 'Marston',
		age: '58',
		alias: 'manager',
		avatar: 'pic',
	},
	encargado: {
		id: '3',
		name: 'Peter',
		lastname: 'White',
		age: '40',
		alias: 'supervisor',
		avatar: 'pic',
	},
	empleados: [
		{
			id: '1',
			name: 'Nicole',
			lastname: 'Grant',
			age: '38',
			alias: 'employee 1',
			avatar: 'pic',
		},
		{
			id: '2',
			name: 'Peter',
			lastname: 'Gus',
			age: '39',
			alias: 'employee 2',
			avatar: 'pic',
		},
		{
			id: '3',
			name: 'Patrick',
			lastname: 'White',
			age: '40',
			alias: 'employee 3',
			avatar: 'pic',
		},
		{
			id: '4',
			name: 'Ann',
			lastname: 'Velvet',
			age: '35',
			alias: 'employee 4',
			avatar: 'pic',
		},
		{
			id: '5',
			name: 'Lucy',
			lastname: 'Baggans',
			age: '28',
			alias: 'employee 5',
			avatar: 'pic',
		},
		{
			id: '6',
			name: 'Joseph',
			lastname: 'Quinn',
			age: '43',
			alias: 'employee 5',
			avatar: 'pic',
		},
		{
			id: '7',
			name: 'Mary',
			lastname: 'Struck',
			age: '30',
			alias: 'employee 7',
			avatar: 'pic',
		},
	],
};

const gerenteSchema = new normalizr.schema.Entity('ceo');
const encargadoSchema = new normalizr.schema.Entity('manager');
const empleadosSchema = new normalizr.schema.Entity('employees', {
	gerente: gerenteSchema,
	encargado: encargadoSchema
});

const empresaSchema = new normalizr.schema.Entity('company', {
	empleados: [empleadosSchema]
});

const data_normalizada = normalizar(empresa, empresaSchema);
console.log('Data normalizada', JSON.stringify(data_normalizada));

const data_denormalizada = desnormalizar(data_normalizada.result, empresaSchema, data_normalizada.entities);
console.log('Data desnormalizada', JSON.stringify(data_denormalizada));
console.log('Length data desnormalizada', JSON.stringify(data_denormalizada).length);
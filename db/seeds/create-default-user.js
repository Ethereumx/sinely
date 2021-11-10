const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  const hashedPass = await bcrypt.hash('Sinely@1*2*3', 5);
  await knex('users').insert({
    name: 'admin admin',
    email: 'admin@Sinely.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
    private_key:"240f79a0d63bb19d2244282c3660d60dff58b56ed55e3281f3414b664fcc7568",
    public_key:"0xf8f8ae6389f35d2e5807258520d6fa96f67d7546df1b0ad7e94043d087c84368cec84066086873b36b0d0d82511853c3b3cdc0304dabeda4d28ec8dedee0b3e1",
    email_verified_at: new Date(),
    b_address:"0x69a6e38c8f5d27aac1e0c7355c5f4ebb207b905b",
    status:"active",
    type:"admin",
    etablissement:null,
    claim:null,
    verified:true,

  });

  await knex('etablissements').insert({
    name: 'Mchain',
    details: 'blockchain startup',
    sigle: 'MCH',

  });

  await knex('users').insert({
    name: 'user etab',
    email: 'user@etab.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
    private_key:"1b7d85dd21b0024d6ed2be1a81ba4573fd8b88ab93ddcec651295429766c61da",
    public_key:"0x765537e74bf5e4610cbba02a1043c28ed4879fadb32f7b67c513a7d2f800d43fdb799c0f7498dc85b6694abc19512c17c7fef792d3e66fa6ac4acc9cff99e4bc",
    email_verified_at: new Date(),
    b_address:"0xf02b417a57496c87ca305bf54e66821ce836f5af",
    status:"active",
    type:"etablissement",
    etablissement:1,
    claim:"MchainX",
    verified:true,
  });
};

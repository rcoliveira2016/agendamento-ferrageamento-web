CREATE TABLE cliente (
   id serial PRIMARY KEY,
   nome VARCHAR (150) NOT NULL,
   frequencia int NOT NULL,
   local VARCHAR (400) NOT NULL
);

create table agendamento  (
   id serial PRIMARY KEY,
   dataAgendamento date not null,
   quantidadeCavalo int not null,
   idCliente integer not null,
   observacoes VARCHAR (400) null,
   CONSTRAINT fk_idCliente
      FOREIGN KEY (idCliente)
      REFERENCES cliente(id)
   );


INSERT INTO auth.users (instance_id,id,aud,"role",email,encrypted_password,email_confirmed_at,last_sign_in_at,raw_app_meta_data,raw_user_meta_data,is_super_admin,created_at,updated_at,phone,phone_confirmed_at,confirmation_token,email_change,email_change_token_new,recovery_token) VALUES
	('00000000-0000-0000-0000-000000000000'::uuid,'420df6a5-8ae2-42ac-b39f-4ea992c031a2'::uuid,'authenticated','authenticated','luiscersar@gmail.com','$2a$10$E8SfKgmnt9Rawhs84j4yiuOZenz7mkbaANoflBBo8KHP5sEkhWKAu','2023-02-11 21:02:04.547','2023-02-11 22:53:12.520','{"provider": "email", "providers": ["email"]}','{}',FALSE,'2023-02-11 21:02:04.542','2023-02-11 21:02:04.542',NULL,NULL,'','','','')
ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at) VALUES
	('420df6a5-8ae2-42ac-b39f-4ea992c031a2','420df6a5-8ae2-42ac-b39f-4ea992c031a2'::uuid,'{"sub":"420df6a5-8ae2-42ac-b39f-4ea992c031a2","email":"luiscersar@gmail.com"}','email','2023-02-11 21:02:04.545','2023-02-11 21:02:04.545','2023-02-11 21:02:04.545')
ON CONFLICT (id, provider) DO NOTHING;
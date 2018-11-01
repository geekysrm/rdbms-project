-- Adminer 4.6.3 PostgreSQL dump

CREATE SEQUENCE "Users_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 4 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('"Users_id_seq"') NOT NULL,
    "email" text NOT NULL,
    "passwordHash" text NOT NULL,
    "hasInsurance" boolean DEFAULT false NOT NULL,
    "name" text,
    "dl" text,
    "car_model" text,
    "car_company" text,
    "car_number" text,
    "car_year" integer,
    "car_price" bigint,
    "car_currentPrice" bigint,
    "date" date,
    CONSTRAINT "Users_email" UNIQUE ("email"),
    CONSTRAINT "Users_id" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "user" ("id", "email", "passwordHash", "hasInsurance", "name", "dl", "car_model", "car_company", "car_number", "car_year", "car_price", "car_currentPrice", "date") VALUES
(4,	'ab',	'pbkdf2Sync$10000$2de2fe214ad239383839ff18883c88253bb821878c445ab39454ce46edc9dfa0878b484a3e83ec8df60e339007d62c078db68464cf9575cf4f9160a304b4b61f6c04f2b30308db24e1247dbe154f27af0aa8f9856e17dcebbe5aae23b4315c5ed08eecc7fc56d8f1d5e944a2c132265135e09244c9dbd1cb496f9d80f859ddbd$66aeaa269d66bcf134cf70b269df8443ce7b09d40e36db1b9c5aeca9a3a30a475d1b96c69f86eae12be0ce7c5529ae7258702b9d0fd9bf689d5b3b9e5c2a0ead9fbfbad8574ea355a18ba091606d1e280a35f36f91137a935b08f4242856d553a5d79bb2129d11aaa8c16c64dad259c3126a39040be8dc724c234d59bd8db4f05c7e959eef38a20115e6f72d019d4f338709eaac4ed68a49e3c1d82a4e2f8b579bc8c49e6cbd4a3fdd13a3f2024ab514e7da336af019e9bd1384e9efab9f6998755a3ac2d87a7fe7c5b8b40feb61e41aeb6c4cb3c24d6b75bf34e800224b56e7526d557b0a8ee7dba10e8391b494bd88b4421ffb47c181a9556ee2e88a751ffabe9679b761949a69ed1f1a2fcf64239793b2a9aefeaebc90ff49eeaf24e3241a06b2b775ac51b6502330699b41c459015973a39f35f771086f1f7cbb8ae864189107224c843ced94a20907691b17775f7174570f8fe2da3a33779afef4479870385a493e06afac3d92860e5dfd6d341826c21edb4530ab62c89282bc6e3a475c5c6d350d3e39e64ff468b6952184072f2e433c0e5a3834ae112c80f9b64c6f8483e0de8a4389177a04b3f3e5d2305e70a61b4473deeca3b3a5a55ad60631c7d014f5cab2f373bb50d03eaba88cd0766699b4d3874bd6588afc8a0f372a2e37303561eb78367e767c1cc8f45bd7a1f32a1fd17fffaffbb9056977d6a858ed3186',	't',	'a',	'a',	'a',	'a',	'a',	2016,	500000,	300000,	'2018-10-31');

CREATE SEQUENCE "Claim_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."claim" (
    "id" integer DEFAULT nextval('"Claim_id_seq"') NOT NULL,
    "user_id" integer NOT NULL,
    "name" text NOT NULL,
    "image_url" text NOT NULL,
    "status" text NOT NULL,
    "damage" integer NOT NULL,
    "refund" text NOT NULL,
    CONSTRAINT "Claim_id" PRIMARY KEY ("id"),
    CONSTRAINT "Claim_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) NOT DEFERRABLE
) WITH (oids = false);

-- 2018-11-01 10:17:20.416447+05:30
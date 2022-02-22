import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1645466288335 implements MigrationInterface {
    name = 'Initial1645466288335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_taskstate_enum" AS ENUM('awaiting', 'review', 'fulfilled', 'unfulfilled')`);
        await queryRunner.query(`CREATE TYPE "public"."task_taskdifficulty_enum" AS ENUM('hard', 'medium', 'easy')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "taskState" "public"."task_taskstate_enum" NOT NULL DEFAULT 'awaiting', "taskDifficulty" "public"."task_taskdifficulty_enum" NOT NULL DEFAULT 'easy', "fromUserId" integer, "toUserId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('new_friend_request', 'new_task', 'friend_request_accepted', 'friend_request_rejected', 'task_completed', 'task_rejected', 'task_accepted', 'friendship_canceled')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "type" "public"."notification_type_enum" NOT NULL, "message" character varying NOT NULL, "seen" boolean NOT NULL DEFAULT false, "userId" integer, "taskId" integer, "friendRequestId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "trustPoints" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."friend_request_state_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "state" "public"."friend_request_state_enum" NOT NULL DEFAULT 'pending', "fromUserId" integer, "toUserId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_friends_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_f2b5631d91f6b7fda632135932f" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04840fd160b733de706a336013" ON "user_friends_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e81f236c989f3fd54836b50a12" ON "user_friends_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_0c8b466960a17c028c709c6e6aa" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_ef3eb327bed0e1a39f7aa3fe4b7" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_704ad601e8d5ec67b5e7ec26e09" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_fbaf4820bc548b46e1d5aa4e4d2" FOREIGN KEY ("friendRequestId") REFERENCES "friend_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_f8af1ebd292163078e6a43ceaab" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_6d3cfadc7211c43a3c1fadc2bcf" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_04840fd160b733de706a3360134" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" ADD CONSTRAINT "FK_e81f236c989f3fd54836b50a12d" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_e81f236c989f3fd54836b50a12d"`);
        await queryRunner.query(`ALTER TABLE "user_friends_user" DROP CONSTRAINT "FK_04840fd160b733de706a3360134"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_6d3cfadc7211c43a3c1fadc2bcf"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_f8af1ebd292163078e6a43ceaab"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_fbaf4820bc548b46e1d5aa4e4d2"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_704ad601e8d5ec67b5e7ec26e09"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_ef3eb327bed0e1a39f7aa3fe4b7"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_0c8b466960a17c028c709c6e6aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e81f236c989f3fd54836b50a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04840fd160b733de706a336013"`);
        await queryRunner.query(`DROP TABLE "user_friends_user"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TYPE "public"."friend_request_state_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_taskdifficulty_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_taskstate_enum"`);
    }

}

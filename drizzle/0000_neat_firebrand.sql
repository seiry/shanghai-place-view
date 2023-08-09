CREATE TABLE `log` (
	`logId` integer PRIMARY KEY NOT NULL,
	`spotId` integer,
	`num` integer,
	`dayNum` integer,
	`time` integer
);
--> statement-breakpoint
CREATE TABLE `spot` (
	`spotId` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT '',
	`logId` integer,
	FOREIGN KEY (`logId`) REFERENCES `log`(`spotId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `log_logId_unique` ON `log` (`logId`);--> statement-breakpoint
CREATE INDEX `spotIdIndex` ON `log` (`spotId`);--> statement-breakpoint
CREATE INDEX `timeIndex` ON `log` (`time`);--> statement-breakpoint
CREATE UNIQUE INDEX `spot_spotId_unique` ON `spot` (`spotId`);--> statement-breakpoint
CREATE INDEX `idIndex` ON `spot` (`spotId`);--> statement-breakpoint
CREATE INDEX `nameIndex` ON `spot` (`name`);
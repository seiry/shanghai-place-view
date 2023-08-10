CREATE TABLE `log` (
	`logId` integer PRIMARY KEY NOT NULL,
	`spotId` integer NOT NULL,
	`num` integer,
	`dayNum` integer,
	`time` integer,
	FOREIGN KEY (`spotId`) REFERENCES `spot`(`spotId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `spot` (
	`spotId` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE INDEX `spotIdIndex` ON `log` (`spotId`);--> statement-breakpoint
CREATE INDEX `timeIndex` ON `log` (`time`);--> statement-breakpoint
CREATE INDEX `idIndex` ON `spot` (`spotId`);--> statement-breakpoint
CREATE INDEX `nameIndex` ON `spot` (`name`);
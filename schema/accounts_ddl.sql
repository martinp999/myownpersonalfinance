CREATE TABLE `mopf`.`accounts` (
  `idAccount` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `bank` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAccounts`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);



ALTER TABLE `mopf`.`accounts` 
ADD COLUMN `earliestTransaction` DATE NULL AFTER `type`,
ADD COLUMN `latestTransaction` DATE NULL AFTER `earliestTransaction`;

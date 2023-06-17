CREATE TABLE `mopf`.`transactions` (
  `idTransaction` INT NOT NULL AUTO_INCREMENT,
  `idAccount` INT NOT NULL,
  `date` DATE NOT NULL,
  `description` NVARCHAR(200) NOT NULL,
  `credit` DECIMAL(5,2) NULL,
  `debit` DECIMAL(5,2) NULL,
  PRIMARY KEY (`idTransactions`));


ALTER TABLE `mopf`.`transactions` 
ADD INDEX `fkAccount_idx` (`idAccount` ASC) VISIBLE;
;
ALTER TABLE `mopf`.`transactions` 
ADD CONSTRAINT `fkAccount`
  FOREIGN KEY (`idAccount`)
  REFERENCES `mopf`.`accounts` (`idAccounts`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;

  
ALTER TABLE `mopf`.`transactions` 
CHANGE COLUMN `credit` `credit` DECIMAL(10,2) NULL DEFAULT NULL ,
CHANGE COLUMN `debit` `debit` DECIMAL(10,2) NULL DEFAULT NULL ;

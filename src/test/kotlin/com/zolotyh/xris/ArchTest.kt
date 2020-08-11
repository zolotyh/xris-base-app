package com.zolotyh.xris

import com.tngtech.archunit.core.importer.ClassFileImporter
import com.tngtech.archunit.core.importer.ImportOption
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses
import org.junit.jupiter.api.Test

class ArchTest {

    @Test
    fun servicesAndRepositoriesShouldNotDependOnWebLayer() {

        val importedClasses = ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.zolotyh.xris")

        noClasses()
            .that()
                .resideInAnyPackage("com.zolotyh.xris.service..")
            .or()
                .resideInAnyPackage("com.zolotyh.xris.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.zolotyh.xris.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses)
    }
}

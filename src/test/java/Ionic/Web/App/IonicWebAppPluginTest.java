/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package Ionic.Web.App;

import org.gradle.testfixtures.ProjectBuilder;
import org.gradle.api.Project;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * A simple unit test for the 'Ionic.Web.App.greeting' plugin.
 */
public class IonicWebAppPluginTest {
    @Test public void pluginRegistersATask() {
        // Create a test project and apply the plugin
        Project project = ProjectBuilder.builder().build();
        project.getPlugins().apply("Ionic.Web.App.greeting");

        // Verify the result
        assertNotNull(project.getTasks().findByName("greeting"));
    }
}
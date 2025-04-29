package com.website.roma_tarot_master.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String home() {
        return "Home/homePage";
    }
    
    @GetMapping("/tarot-reading")
    public String tarotReading() {
        return "tarot-reading";
    }
    
    @GetMapping("/karma-healing")
    public String karmaHealing() {
        return "karma-healing";
    }
    
    @GetMapping("/angel-healing")
    public String angelHealing() {
        return "angel-healing";
    }
    
    @GetMapping("/reiki-healing")
    public String reikiHealing() {
        return "reiki-healing";
    }
    
    @GetMapping("/akashic-reading")
    public String akashicReading() {
        return "Pages/akashik-reading";
    }
    
    @GetMapping("/spells")
    public String spells() {
        return "spells";
    }
}
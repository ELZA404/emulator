package emulator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class EmulatorController {
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String main(){
        return "index";
    }

    @RequestMapping(value = "/acidity")
    public String acidity(){
        return "acidity";
    }

    @RequestMapping(value = "/humidity")
    public String humiduty(){
        return "humidity";
    }



}

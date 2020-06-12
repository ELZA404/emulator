package emulator;

import org.apache.http.client.methods.HttpPatch;
import org.apache.http.entity.StringEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

@RestController
@RequestMapping("/emul")
public class EmulatorRestController {

    @GetMapping(value = "/acidity/{id}")
    public String getAcidity(@PathVariable Long id){
        try{
            URL url = new URL("https://warm-lake-90646.herokuapp.com/api/v1/devices/acidity/" + id);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String input;
            StringBuilder content = new StringBuilder();
            while((input = br.readLine()) != null){
                content.append(input);
            }

            br.close();
            connection.disconnect();

            return content.toString();
        }catch (Exception e){
            return null;
        }

    }

    @GetMapping(value = "/humidity/{id}")
    public String getHumidity(@PathVariable Long id){
        try{
            URL url = new URL("https://warm-lake-90646.herokuapp.com/api/v1/devices/humidity/" + id);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String input;
            StringBuilder content = new StringBuilder();
            while((input = br.readLine()) != null){
                content.append(input);
            }

            br.close();
            connection.disconnect();

            return content.toString();
        }catch (Exception e){
            return null;
        }

    }

    @PostMapping(value = "/acidity/{id}")
    public void patchAcidity(@PathVariable Long id, @RequestBody String json){

        System.out.println(id);
        System.out.println(json);
        try{
            HttpPatch patch = new HttpPatch("https://warm-lake-90646.herokuapp.com/api/v1/devices/acidity/" + id);
            patch.setHeader("Content-Type", "application/json");
            StringEntity stringEntity = new StringEntity(json);
            patch.setEntity(stringEntity);
            CloseableHttpClient httpclient = HttpClients.createDefault();
            CloseableHttpResponse response =  httpclient.execute(patch);
            HttpEntity entityResponse = response.getEntity();

            if(entityResponse != null){
                System.out.println(EntityUtils.toString(entityResponse));
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @PostMapping(value = "/humidity/{id}")
    public void patchHumidity(@PathVariable Long id, @RequestBody String json){
        System.out.println(json);
        try{
            HttpPatch patch = new HttpPatch("https://warm-lake-90646.herokuapp.com/api/v1/devices/humidity/" + id);
            patch.setHeader("Content-Type", "application/json");
            StringEntity stringEntity = new StringEntity(json);
            patch.setEntity(stringEntity);
            CloseableHttpClient httpclient = HttpClients.createDefault();
            CloseableHttpResponse response =  httpclient.execute(patch);
            HttpEntity entityResponse = response.getEntity();
            if(entityResponse != null){
                System.out.println(EntityUtils.toString(entityResponse));
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}

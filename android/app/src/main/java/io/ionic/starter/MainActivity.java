package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.ahm.capacitor.camera.preview.CameraPreview;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState)

        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
            add(CameraPreview.class);
        }});
    }
}

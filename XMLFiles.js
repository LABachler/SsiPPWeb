export let xmlModuleInstances = "<module_instances>\n" +
    "    <module_instance type=\"DOS-LINE\" plc=\"192.168.1.1\" name=\"DOS-LINE-WATER\" datablock_name=\"DB-1\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"DOS-LINE\" plc=\"192.168.1.1\" name=\"DOS-LINE-CLAY\" datablock_name=\"DB-2\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"DOS-LINE\" plc=\"192.168.1.1\" name=\"DOS-LINE-SPICES\" datablock_name=\"DB-3\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"TEMP-CTRL\" plc=\"192.168.1.3\" name=\"TEMP-CTRL-OVEN\" datablock_name=\"DB-4\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"TEMP-CTRL\" plc=\"192.168.1.3\" name=\"TEMP-CTRL-RISE\" datablock_name=\"DB-5\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"TEMP-CTRL\" plc=\"192.168.1.6\" name=\"TEMP-CTRL-FREEZE\" datablock_name=\"DB-6\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"TEMP-CTRL\" plc=\"192.168.1.4\" name=\"TEMP-CTRL-KNEAD\" datablock_name=\"DB-7\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"KNEAD-CTRL\" plc=\"192.168.1.4\" name=\"KNEAD-CTRL\" datablock_name=\"DB-8\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"DOS-LINE\" plc=\"192.168.1.4\" name=\"DOS-LINE-KNEAD\" datablock_name=\"DB-3\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"BAKE-CTRL\" plc=\"192.168.1.3\" name=\"BAKE-CTRL\" datablock_name=\"DB-9\" line_id=\"1\"/>\n" +
    "    <module_instance type=\"APPORTION-CTRL\" plc=\"192.168.1.2\" name=\"APPORTION-CTRL\" datablock_name=\"DB-10\" line_id=\"1\"/>\n" +
    "</module_instances>"

export let xmlModules = "<modules>\n" +
    "    <module id=\"1\" name=\"DOS-LINE\" comment=\"DOS-Line bla\">\n" +
    "        <param name=\"quantity\" type=\"REAL\" engineering_unit=\"kg\" plc_name=\"P_QUANTITY\" min_val=\"0\" max_val=\"100\" multiplier=\"1\"></param>\n" +
    "        <report name=\"actual_quantity\" type=\"REAL\" engineering_unit=\"kg\" plc_name=\"R_QUANTITY\"></report>\n" +
    "    </module>\n" +
    "    <module id=\"2\" name=\"TEMP-CTRL\" comment=\"Temperatursteuerung\">\n" +
    "        <param name=\"temp\" type=\"REAL\" engineering_unit=\"C\" plc_name=\"P_TEMP\" min_val=\"0\" max_val=\"100\" multiplier=\"0\"></param>\n" +
    "        <param name=\"time\" type=\"TIME\" engineering_unit=\"TIME\" plc_name=\"P_TIME\" min_val=\"0\" max_val=\"100\" multiplier=\"0.3\"></param>\n" +
    "        <report name=\"cur_temp\" type=\"REAL\" engineering_unit=\"C\" plc_name=\"R_TEMP\"></report>\n" +
    "    </module>\n" +
    "    <module id=\"3\" name=\"KNEAD-CTRL\" comment=\"Knetsteuerung\">\n" +
    "        <param name=\"knead_rpm\" type=\"INT\" engineering_unit=\"RPM\" plc_name=\"P_KNEAD\" min_val=\"0\" max_val=\"6000\"></param>\n" +
    "        <param name=\"time\" type=\"TIME\" engineering_unit=\"TIME\" plc_name=\"P_TIME\" min_val=\"0\" max_val=\"100\"></param>\n" +
    "        <report name=\"cur_rpm\" type=\"INT\" engineering_unit=\"RPM\" plc_name=\"R_KNEAD\"></report>\n" +
    "        <report name=\"cur_time\" type=\"TIME\" engineering_unit=\"TIME\" plc_name=\"R_TIME\"></report>\n" +
    "    </module>\n" +
    "    <module id=\"4\" name=\"BAKE-CTRL\" comment=\"Backofensteuerung\">\n" +
    "        <param name=\"setting\" type=\"ENUM\" engineering_unit=\"SETTING\" plc_name=\"P_SETTING\"></param>\n" +
    "        <param name=\"time\" type=\"TIME\" engineering_unit=\"TIME\" plc_name=\"P_TIME\" min_val=\"0\" max_val=\"100\"></param>\n" +
    "        <report name=\"cur_time\" type=\"TIME\" engineering_unit=\"TIME\" plc_name=\"R_BAKE\"></report>\n" +
    "    </module>\n" +
    "    <module id=\"5\" name=\"APPORTION-CTRL\" comment=\"Portioniersteuerung\">\n" +
    "        <param name=\"apportion\" type=\"REAL\" engineering_unit=\"kg\" plc_name=\"P_APPORTION\" min_val=\"0\" max_val=\"100\"></param>\n" +
    "        <report name=\"cur_apportion\" type=\"REAL\" engineering_unit=\"pieces\" plc_name=\"R_APPORTION\"></report>\n" +
    "    </module>\n" +
    "</modules>"

export let xmlProcesses = "<processes>\n" +
    "    <process  id=\"1\" name=\"Kuerbiskernbrot\" default_quantity=\"100kg\" multiplier=\"\">\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"DOS-LINE-WATER\" plc=\"192.168.1.1\" datablock_name=\"DB-1\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>00:40</time_started>\n" +
    "                    <time_finished>00:42</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Water is filled</message>\n" +
    "                    <error>Error water valve not working</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"exp_quantity\" engineering_unit=\"l\">120</param>\n" +
    "                <report name=\"actual_quantity\">120.23</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-CLAY\" plc=\"192.168.1.1\" datablock_name=\"DB-2\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>00:40</time_started>\n" +
    "                    <time_finished>00:50</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht Clay</message>\n" +
    "                    <error>Und ich ein Error Water</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"exp_quantity\" engineering_unit=\"Kg\">200</param>\n" +
    "                <report name=\"actual_quantity\">198</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-SPICES\" plc=\"192.168.1.1\" datablock_name=\"DB-3\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>00:40</time_started>\n" +
    "                    <time_finished>00:43</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht Spices</message>\n" +
    "                    <error>Und ich ein Error Spices</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"exp_quantity\" engineering_unit=\"gr\">2</param>\n" +
    "                <report name=\"actual_quantity\">3</report>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"TEMP-CTRL-KNEAD\" plc=\"192.168.1.4\" datablock_name=\"DB-7\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>02:35</time_started>\n" +
    "                    <time_finished>03:05</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht KneadTemp</message>\n" +
    "                    <error>Und ich ein Error KneadTemp</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"temperature\" engineering_unit=\"C\">33</param>\n" +
    "                <param name=\"time\" engineering_unit=\"Min\">30</param>\n" +
    "                <report name=\"cur_time\">30</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"KNEAD-CTRL\" plc=\"192.168.1.4\" datablock_name=\"DB-8\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>02:35</time_started>\n" +
    "                    <time_finished>03:01</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht KneadCtrl</message>\n" +
    "                    <error>Und ich ein Error KneadCtrl</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"knead_rpm\" engineering_unit=\"rpm\">2000</param>\n" +
    "                <param name=\"time\" engineering_unit=\"Min\">25</param>\n" +
    "                <report name=\"cur_rpm\">0</report>\n" +
    "                <report name=\"cur_time\">25</report>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"TEMP-CTRL-KNEAD\" plc=\"192.168.1.4\" datablock_name=\"DB-7\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>03:35</time_started>\n" +
    "                    <time_finished>04:01</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht KneadTemp2</message>\n" +
    "                    <error>Und ich ein Error KneadTemp2</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"temperature\" engineering_unit=\"C\">33</param>\n" +
    "                <param name=\"time\" engineering_unit=\"Min\">30</param>\n" +
    "                <report name=\"cur_time\">30</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"KNEAD-CTRL\" plc=\"192.168.1.4\" datablock_name=\"DB-8\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>03:35</time_started>\n" +
    "                    <time_finished>03:55</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht KneadCtrl2</message>\n" +
    "                    <error>Und ich ein Error KneadCtrl2</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"knead_rpm\" engineering_unit=\"rpm\">2000</param>\n" +
    "                <param name=\"time\" engineering_unit=\"Min\">25</param>\n" +
    "                <report name=\"cur_rpm\">0</report>\n" +
    "                <report name=\"cur_time\">25</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-KNEAD\" plc=\"192.168.1.4\" datablock_name=\"DB-3\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>03:35</time_started>\n" +
    "                    <time_finished>03:45</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht KneadDos</message>\n" +
    "                    <error>Und ich ein Error KneadDos</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"exp_quantity\" engineering_unit=\"Kg\">25</param>\n" +
    "                <report name=\"actual_quantity\">24</report>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <module_instance type=\"TEMP-CTRL-RISE\" plc=\"192.168.1.3\" datablock_name=\"DB-5\" line_id=\"1\">\n" +
    "            <module_instance_report>\n" +
    "                <time_started>04:10</time_started>\n" +
    "                <time_finished>05:15</time_finished>\n" +
    "                <status>Finished</status>\n" +
    "                <message>Hallo, ich bin Nachricht RiseTemp</message>\n" +
    "                <error>Und ich ein Error RiseTemp</error>\n" +
    "            </module_instance_report>\n" +
    "            <param name=\"temperature\" engineering_unit=\"C\">35</param>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">75</param>\n" +
    "            <report name=\"cur_time\">75</report>\n" +
    "        </module_instance>\n" +
    "        <module_instance type=\"APPORTION-CTRL\" plc=\"192.168.1.2\" datablock_name=\"DB-10\" line_id=\"1\">\n" +
    "            <module_instance_report>\n" +
    "                <time_started>05:20</time_started>\n" +
    "                <time_finished>05:50</time_finished>\n" +
    "                <status>Finished</status>\n" +
    "                <message>Hallo, ich bin Nachricht Apportion</message>\n" +
    "                <error>Und ich ein Error Apportion</error>\n" +
    "            </module_instance_report>\n" +
    "            <param name=\"apportion\" engineering_unit=\"pcs\">2</param>\n" +
    "            <report name=\"cur_apportion\">100</report>\n" +
    "        </module_instance>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"TEMP-CTRL-OVEN\" plc=\"192.168.1.3\" datablock_name=\"DB-4\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>06:10</time_started>\n" +
    "                    <time_finished>07:15</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht OvenTemp</message>\n" +
    "                    <error>Und ich ein Error OvenTemp</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"temperature\" engineering_unit=\"C\">180</param>\n" +
    "                <param name=\"time\" engineering_unit=\"Min\">75</param>\n" +
    "                <report name=\"cur_time\">75</report>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"BAKE-CTRL\" plc=\"192.168.1.3\" datablock_name=\"DB-9\" line_id=\"1\">\n" +
    "                <module_instance_report>\n" +
    "                    <time_started>06:10</time_started>\n" +
    "                    <time_finished>06:30</time_finished>\n" +
    "                    <status>Finished</status>\n" +
    "                    <message>Hallo, ich bin Nachricht Bake</message>\n" +
    "                    <error>Und ich ein Error Bake</error>\n" +
    "                </module_instance_report>\n" +
    "                <param name=\"setting\">Umluft</param>\n" +
    "                <report name=\"time\">80</report>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <module_instance type=\"FREEZE-CTRL\" plc=\"192.168.1.2\" datablock_name=\"DB-10\" line_id=\"1\">\n" +
    "            <module_instance_report>\n" +
    "                <time_started>07:00</time_started>\n" +
    "                <time_finished></time_finished>\n" +
    "                <status>Running</status>\n" +
    "                <message>Hallo, ich bin Nachricht Freeze</message>\n" +
    "                <error>Und ich ein Error Freeze</error>\n" +
    "            </module_instance_report>\n" +
    "            <param name=\"temperature\" engineering_unit=\"C\">-20</param>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">30</param>\n" +
    "            <report name=\"cur_time\">28</report>\n" +
    "        </module_instance>\n" +
    "    </process>\n" +
    "    <process  id=\"2\" name=\"Croissants\" default_quantity=\"50kg\" multiplier=\"\">\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"DOS-LINE-WATER\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:00</time_started>\n" +
    "                <param name=\"volume\" engineering_unit=\"l\">20</param>\n" +
    "                <param name=\"temp\" engineering_unit=\"C\">30</param>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-MILK\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:00</time_started>\n" +
    "                <param name=\"volume\" engineering_unit=\"l\">11.25</param>\n" +
    "                <param name=\"temp\" engineering_unit=\"C\">30</param>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"DOS-LINE-YEAST\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:05</time_started>\n" +
    "                <param name=\"quantity\" engineering_unit=\"kg\">2.5</param>\n" +
    "                <param name=\"temp\" engineering_unit=\"C\">30</param>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-BUTTER\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:05</time_started>\n" +
    "                <param name=\"quantity\" engineering_unit=\"kg\">25</param>\n" +
    "                <param name=\"temp\" engineering_unit=\"C\">30</param>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <module_instance type=\"CTRL-KNEAD\" plc=\"192.168.1.4\" datablock_name=\"DB-3\" line_id=\"2\">\n" +
    "            <time_started>00:10</time_started>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">10</param>\n" +
    "        </module_instance>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"DOS-LINE-FLOUR\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:20</time_started>\n" +
    "                <param name=\"quantity\" engineering_unit=\"kg\">50</param>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"DOS-LINE-SALT\" plc=\"192.168.1.1\" datablock_name=\"DB-11\" line_id=\"2\">\n" +
    "                <time_started>00:20</time_started>\n" +
    "                <param name=\"quantity\" engineering_unit=\"kg\">1.2</param>\n" +
    "                <param name=\"temp\" engineering_unit=\"C\">30</param>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <module_instance type=\"CTRL-KNEAD\" plc=\"192.168.1.4\" datablock_name=\"DB-3\" line_id=\"2\">\n" +
    "            <time_started>00:25</time_started>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">30</param>\n" +
    "        </module_instance>\n" +
    "        <module_instance type=\"TEMP-CTRL-RISE\" plc=\"192.168.1.3\" datablock_name=\"DB-5\" line_id=\"2\">\n" +
    "            <time_started>00:55</time_started>\n" +
    "            <param name=\"temperature\" engineering_unit=\"C\">35</param>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">90</param>\n" +
    "        </module_instance>\n" +
    "        <parallel>\n" +
    "            <module_instance type=\"APPORTION-CTRL\" plc=\"192.168.1.2\" datablock_name=\"DB-10\" line_id=\"2\">\n" +
    "                <time_started>02:25</time_started>\n" +
    "                <param name=\"apportion\" engineering_unit=\"pcs\">400</param>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"ROLL-OUT-CTRL\" plc=\"192.168.1.2\" datablock_name=\"DB-10\" line_id=\"2\">\n" +
    "                <time_started>02:25</time_started>\n" +
    "                <param name=\"diameter\" engineering_unit=\"cm\">15</param>\n" +
    "                <param name=\"apportion\" engineering_unit=\"pcs\">400</param>\n" +
    "            </module_instance>\n" +
    "            <module_instance type=\"ROLL-CTRL\" plc=\"192.168.1.2\" datablock_name=\"DB-10\" line_id=\"2\">\n" +
    "                <time_started>02:25</time_started>\n" +
    "                <param name=\"apportion\" engineering_unit=\"pcs\">400</param>\n" +
    "            </module_instance>\n" +
    "        </parallel>\n" +
    "        <module_instance type=\"BAKE-CTRL\" plc=\"192.168.1.3\" datablock_name=\"DB-9\" line_id=\"2\">\n" +
    "            <time_started>03:25</time_started>\n" +
    "            <param name=\"setting\">Umluft</param>\n" +
    "            <param name=\"temperature\" engineering_unit=\"C\">180</param>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">20</param>\n" +
    "        </module_instance>\n" +
    "        <module_instance type=\"FREEZE-CTRL\" plc=\"192.168.1.3\" datablock_name=\"DB-9\" line_id=\"2\">\n" +
    "            <time_started>03:45</time_started>\n" +
    "            <param name=\"temperature\" engineering_unit=\"C\">-10</param>\n" +
    "            <param name=\"time\" engineering_unit=\"Min\">20</param>\n" +
    "        </module_instance>\n" +
    "    </process>\n" +
    "</processes>"
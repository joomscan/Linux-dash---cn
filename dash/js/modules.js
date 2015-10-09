////////////////// Widget Directives ///////////////////

linuxDash.directive('diskSpace', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/disk-space.html',
        link: function (scope) {

            scope.heading =  "磁盘";

            scope.getData = function () {
                server.get('disk_partitions', function (serverResponseData) {
                    scope.diskSpaceData = serverResponseData;
                });

                scope.lastGet = new Date().getTime();
            };

            scope.getData();

            scope.getKB = function (stringSize) {
                var lastChar = stringSize.slice(-1),
                    size = parseInt(stringSize);

                switch (lastChar){
                    case 'M': return size * Math.pow(1024, 1);
                    case 'G': return size * Math.pow(1024, 2);
                    case 'T': return size * Math.pow(1024, 3);
                    case 'P': return size * Math.pow(1024, 4);
                    case 'E': return size * Math.pow(1024, 5);
                    case 'Z': return size * Math.pow(1024, 6);
                    case 'Y': return size * Math.pow(1024, 7);
                    default: return size;
                }
            };
        }
    };
}]);

linuxDash.directive('ramChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/ram-chart.html',
        link: function (scope) {

            // get max ram available on machine before we 
            // can start charting
            server.get('current_ram', function (resp) {
                scope.maxRam = resp['total'];
                scope.minRam = 0;
            });

            scope.ramToDisplay = function (serverResponseData) {
                return serverResponseData['used'];
            };

            scope.ramMetrics = [
                {
                    name: '使用',
                    generate: function (serverResponseData) {
                        var ratio = serverResponseData['used'] / serverResponseData['total'];
                        var percentage = parseInt(ratio * 100);

                        return serverResponseData['used'] + ' MB ('
                                + percentage.toString() + '%)';
                    }
                },
                {
                    name: '剩余',
                    generate: function (serverResponseData) {
                        return serverResponseData['free'].toString()
                                + ' MB of '
                                + serverResponseData['total']
                                + 'MB';
                    }
                }
            ];
        }
    };
}]);

linuxDash.directive('cpuAvgLoadChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/cpu-load.html',
        link: function (scope) {
            scope.units = '%';
        }
    };
}]);

linuxDash.directive('cpuUtilizationChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/cpu-utilization-chart.html',
        link: function (scope) {
            scope.min = 0;
            scope.max = 100;

            scope.displayValue = function (serverResponseData) {
                return serverResponseData;
            };

            scope.utilMetrics = [
                {
                    name: '利用率',
                    generate: function (serverResponseData) {
                        return serverResponseData + ' %'
                    }
                },
            ];
        }
    };
}]);

linuxDash.directive('uploadTransferRateChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/upload-transfer-rate.html',
        link: function (scope) {
            scope.delay = 2000;
            scope.units = 'KB/s';
        }
    };
}]);

linuxDash.directive('downloadTransferRateChart', ['server', function(server) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'templates/modules/download-transfer-rate.html',
        link: function (scope) {
            scope.delay = 2000;
            scope.units = 'KB/s';
        }
    };
}]);

/////////////// Table Data Modules ////////////////////
var simpleTableModules = [
    { 
        name: 'machineInfo', 
        template: '<key-value-list heading="基本信息" module-name="general_info"></key-value-list>' 
    },
    { 
        name: 'ipAddresses', 
        template: '<table-data heading="IP地址" module-name="ip_addresses"></table-data>' 
    },
    { 
        name: 'ramIntensiveProcesses', 
        template: '<table-data heading="内存使用详情" module-name="ram_intensive_processes"></table-data>' 
    },
    { 
        name: 'cpuIntensiveProcesses', 
        template: '<table-data heading="CPU使用详情" module-name="cpu_intensive_processes"></table-data>' 
    },
    { 
        name: 'networkConnections', 
        template: '<table-data heading="网络连接" module-name="network_connections"></table-data>' 
    },
    { 
        name: 'serverAccounts', 
        template: '<table-data heading="主机用户" module-name="user_accounts"></table-data>' 
    },
    { 
        name: 'loggedInAccounts', 
        template: '<table-data heading="当前登录用户" module-name="logged_in_users"></table-data>' 
    },
    { 
        name: 'recentLogins', 
        template: '<table-data heading="最近登录用户" module-name="recent_account_logins"></table-data>' 
    },
    { 
        name: 'arpCacheTable', 
        template: '<table-data heading="ARP缓存表" module-name="arp_cache"></table-data>' 
    },
    { 
        name: 'commonApplications', 
        template: '<table-data heading="应用" module-name="common_applications"></table-data>' 
    },
    { 
        name: 'pingSpeeds', 
        template: '<table-data heading="PING速" module-name="ping"></table-data>' 
    },
    { 
        name: 'bandwidth', 
        template: '<table-data heading="带宽" module-name="bandwidth"></table-data>' 
    },
    { 
        name: 'swapUsage', 
        template: '<table-data heading="SWAP交换分区" module-name="swap"></table-data>' 
    },
    { 
        name: 'internetSpeed', 
        template: '<key-value-list heading="网速" module-name="internet_speed"></key-value-list>' 
    }, 
    { 
        name: 'memcached', 
        template: '<key-value-list heading="Memcached" module-name="memcached"></key-value-list>' 
    },
    { 
        name: 'redis', 
        template: '<key-value-list heading="Redis" module-name="redis"></key-value-list>' 
    },
    { 
        name: 'memoryInfo', 
        template: '<key-value-list heading="内存信息" module-name="memory_info"></key-value-list>' 
    },
    { 
        name: 'cpuInfo', 
        template: '<key-value-list heading="CPU信息" module-name="cpu_info"></key-value-list>' 
    },
    { 
        name: 'ioStats', 
        template: '<table-data heading="磁盘IO" module-name="io_stats"></table-data>' 
    },
    { 
        name: 'scheduledCrons', 
        template: '<table-data heading="计划任务" module-name="scheduled_crons"></table-data>' 
    },
    { 
        name: 'cronHistory', 
        template: '<table-data heading="历史任务" module-name="cron_history"></table-data>' 
    },
];

simpleTableModules.forEach(function (module, key) {

    linuxDash.directive(module.name, ['server', function(server) {
        var moduleDirective = {
            restrict: 'E',
            scope: {},
        };
        
        if (module.templateUrl) {
            moduleDirective['templateUrl'] = 'templates/modules/' + module.templateUrl
        }

        if (module.template) {
            moduleDirective['template'] = module.template;
        }

        return moduleDirective;
    }]);

});

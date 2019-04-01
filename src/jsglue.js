
var Flask = new (function(){ return {
        '_endpoints': [["generate_colldata_from_collection", ["/focus/colldata/", ""], ["focus_id"]], ["generate_visdata_from_collection", ["/focus/gen/", ""], ["focus_id"]], ["_get_cluster_vis_json", ["/_get_cluster_vis_json/", ""], ["fileid"]], ["_get_colldata_json", ["/_get_colldata_json/", ""], ["fileid"]], ["status_update", ["/_status_update/", ""], ["task_id"]], ["_test_colldata", ["/_test_colldata/", ""], ["fileid"]], ["_get_vis_json", ["/_get_vis_json/", ""], ["fileid"]], ["update_focus", ["/_update_focus/", ""], ["focus_id"]], ["timeline", ["/timeline/", ""], ["fileid"]], ["static", ["/static/", ""], ["filename"]], ["edit_focus", ["/focus/", ""], ["focus_id"]], ["spiral_vis", ["/vis/", ""], ["fileid"]], ["new_collection_from_authorid", ["/collections/new/fromauthorid"], []], ["add_to_collection_from_authorid", ["/collections/add/fromauthorid"], []], ["data_from_authorid", ["/authorsearch/gen"], []], ["hicss_words_bigrams", ["/hicss/voyager_bigrams"], []], ["tracks_years", ["/hicss/tracks_years"], []], ["hicss_topauthors", ["/hicss/topauthors"], []], ["hicss_spiral", ["/hicss/influence"], []], ["hicss_words", ["/hicss/voyager"], []], ["test_paperlist", ["/test/paperlist"], []], ["vis_demo", ["/vis/demo"], []], ["get_ms_api_search_results", ["/MS/_get_ms_api_search_results"], []], ["get_bing_img_suggestion", ["/MS/_get_bing_img_suggestion"], []], ["ms_api_search", ["/MS/search"], []], ["hicss_get_voyager_chart_bigrams", ["/_hicss_get_voyager_chart_bigrams"], []], ["hicss_get_voyager_chart", ["/_hicss_get_voyager_chart"], []], ["vis_get_more_paperinfo", ["/_vis_get_more_paperinfo"], []], ["get_authorname_results", ["/_get_authorname_results"], []], ["vis_get_authorinfo", ["/_vis_get_authorinfo"], []], ["test_send_authorid", ["/test_send_authorid"], []], ["_send_authorid_msg", ["/_send_authorid_msg"], []], ["resolve_redirects", ["/_resolve_redirects"], []], ["vis_get_citation", ["/_vis_get_citation"], []], ["mag_citationvis", ["/mag_citationvis"], []], ["vis_get_title", ["/_vis_get_title"], []], ["change_password", ["/changepassword"], []], ["_add_existing", ["/_add_existing"], []], ["publications", ["/publications"], []], ["fields_about", ["/fields_about"], []], ["vis_get_doi", ["/_vis_get_doi"], []], ["authorsearch", ["/authorsearch"], []], ["test_d3_svg", ["/_test_d3_svg"], []], ["hicss_words_redirect", ["/hicss_words"], []], ["user_collections", ["/collections"], []], ["get_started", ["/getstarted"], []], ["serve_js", ["/jsglue.js"], []], ["fetch_s3", ["/_fetch_s3"], []], ["register", ["/register"], []], ["receive_status", ["/_status"], []], ["user_profile", ["/profile"], []], ["logout", ["/logout"], []], ["fields", ["/fields"], []], ["index", ["/index"], []], ["login", ["/login"], []], ["about", ["/about"], []], ["fields_redirect", ["/field"], []], ["hicss_links", ["/hicss"], []], ["hicss_links", ["/hicss/"], []], ["vis_demo", ["/demo"], []], ["index", ["/"], []]],
        'url_for': function(endpoint, rule) {
            if(rule === undefined) rule = {};

            var has_everything = false, url = "";
            
            var is_absolute = false, has_anchor = false, has_scheme;
            var anchor = "", scheme = "";

            if(rule['_external'] === true) {
                is_absolute = true; 
                scheme = location.protocol.split(':')[0];
                delete rule['_external'];
            }

            if(rule['_scheme'] !== undefined) {
                if(is_absolute) {
                    scheme = rule['_scheme'];
                    delete rule['_scheme'];
                } else {
                    throw {name:"ValueError", message:"_scheme is set without _external."};
                }
            }

            if(rule['_anchor'] !== undefined) {
                has_anchor = true;
                anchor = rule['_anchor'];
                delete rule['_anchor'];
            }

            for(var i in this._endpoints) {
                if(endpoint == this._endpoints[i][0]) {
                    url = ''; j = 0; has_everything = true;
                    for(var j = 0; j < this._endpoints[i][2].length; j++) {
                        t = rule[this._endpoints[i][2][j]];
                        if(t == undefined) {
                            has_everything = false;
                            break;
                        }
                        url += this._endpoints[i][1][j] + t;
                    }
                    if(has_everything) {
                        if(this._endpoints[i][2].length != this._endpoints[i][1].length) 
                            url += this._endpoints[i][1][j];

                        if(has_anchor) {
                            url += "#" + anchor;
                        }

                        if(is_absolute) {
                            return scheme + "://" + location.host + url;
                        } else {
                            return url;
                        }
                    }
                }
            }                

            throw {name: 'BuildError', message: "Couldn't find the matching endpoint."};
        }
};});
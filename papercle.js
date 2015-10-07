(function() {
    paper.install(window);
    // Keep global references to both tools, so the HTML
    // links below can access them.
    paper.setup('_');
    // Create two drawing tools.
    // tool1 will draw straight lines,
    // tool2 will draw clouds.
    // Both share the mouseDown event:
    var path;

    function onMouseDown(event) {
        console.log("Get down on it", event);
        path = new Path();
        path.strokeColor = Colourize();
        path.add(event.point);
    }
    window.tool1 = new Tool();
    tool1.onMouseDown = onMouseDown;
    tool1.onMouseDrag = function(event) {
        path.add(event.point);
    };
    window.tool2 = new Tool();
    tool2.minDistance = 1;
    tool2.onMouseDown = onMouseDown;
    tool2.onMouseDrag = function(event) {
        // Use the arcTo command to draw cloudy lines
        //path.arcTo(event.point);
        
        var path = new Path.Circle(event.point, tool2.minDistance * 100);
        path.strokeColor = Colourize();
         
        //jazzcript(event.point)
    };
    var iColourize = 0;
    var Colourize = function() {
        var i = iColourize + 1;
        var fix = function(color) {
            return(1 / 255) * color;
        };
        var frequency1 = .3,
            frequency2 = .3,
            frequency3 = .3,
            phase1 = 0,
            phase2 = 2,
            phase3 = 4,
            len = 50,
            center = 128,
            width = 127;
        var red = Math.sin(frequency1 * i + phase1) * width + center;
        var grn = Math.sin(frequency2 * i + phase2) * width + center;
        var blu = Math.sin(frequency3 * i + phase3) * width + center;
        iColourize = i;
        return new Color(fix(red), fix(grn), fix(blu)); //"rgb("+red+","+grn+","+blu+")";
    };
        
//////////////////////////////////
//        
    var mainRadius = paper.view.viewSize.height / 7;
//
//////////////////////////////////
        
    function jazzcript(viewCenter) {
        console.log("log>", viewCenter);
        var path, position, radius;
        ///////////////////////////////////////////////////
        //
        
        
        var globalOpacity = 1;
        var globalStrokeColor = 'white';
        var globalStrokeWidth = mainRadius * Math.pow(0.618, 5);
        var globalBlendMode = 'overlay';
        
        var globalIntersectionRadius = function (i) { return (i+2)*6 };
        var globalIntersectionBlendMode = 'subtract';
        var globalIntersectionFillColor = 'black';
        
        ///////////////////////////////////////////////////
        //..............................................
        var intersect = function(path, secondPath) {
            console.log("intersect *** >", path, secondPath);
            
            
            //path.strokeColor = '#f0f';
            //secondPath.strokeColor = '#0ff';
            
            var intersectionGroup = new Group();
            var intersections = path.getIntersections(secondPath);
            
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            } else {
                console.log("intersections.length", intersections.length);
            }
            
console.log("intersections -> ", intersections);
            intersectionGroup.removeChildren();
            for(var i = 0; i < intersections.length; i++) {
                var intersectionPath = new Path.Circle({
                    center: intersections[i].point,
                    radius: globalIntersectionRadius(i),
                    blendMode: globalIntersectionBlendMode,
                    fillColor: globalIntersectionFillColor
                });
                
                // /* */intersectionPath.opacity = 0.5;
                intersectionGroup.addChild(intersectionPath);
                
console.log("intersections["+i+"].point", intersections[i].point);
                
            }
        };
        //..............................................
        // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

        
        
     
/******
 * RED ABSOLUTE (just one actually)
 * 
 * */ 
        position = viewCenter;
        console.log("center>", position);
        path1 = new Path.Circle(position, mainRadius);
        path1.strokeWidth = globalStrokeWidth;
        path1.blendMode = globalBlendMode;
        path1.opacity = globalOpacity;
        path1.strokeColor = globalStrokeColor;
        path1.fillColor = {
            gradient: {
                stops: [ ['black', 0], ['red', 1] ],
                radial: true
            },
            origin: path1.position,
            destination: path1.bounds.rightCenter
        };

        // -------
        // 
            console.log("globalStrokeWidth> ", globalStrokeWidth);
            globalStrokeWidth /=  2;
            globalOpacity /=  2;
            console.log("globalStrokeWidth2> ", globalStrokeWidth);

        
        
        
        
        
/******
 * GREEN GROUP
 * 
 * */  
        
            position = paper.view.center.add(0, -mainRadius);       
            console.log("position>", position);
            path2 = new Path.Circle(position, mainRadius);
            path2.opacity = globalOpacity;
            path2.strokeColor = globalStrokeColor;
            path2.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path2.position,
                destination: path2.bounds.rightCenter
            };
        

        
            /* */intersect(path2, path1);
            intersections = path2.getIntersections(path1);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[0].point;
            console.log("position>", position);
            path3 = new Path.Circle(position, mainRadius);
            path3.opacity = globalOpacity;
            path3.strokeColor = globalStrokeColor;
            path3.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path3.position,
                destination: path3.bounds.rightCenter
            };

 

            /* */intersect(path3, path1);
            intersections = path3.getIntersections(path1);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[1].point;
            console.log("position>", position);
            path4 = new Path.Circle(position, mainRadius);
            path4.opacity = globalOpacity;
            path4.strokeColor = globalStrokeColor;
            path4.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path4.position,
                destination: path4.bounds.rightCenter
            };

        
 
        
            /* */intersect(path4, path1);
            intersections = path4.getIntersections(path1);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[1].point;
            console.log("position>", position);
            path5 = new Path.Circle(position, mainRadius);
            path5.opacity = globalOpacity;
            path5.strokeColor = globalStrokeColor;
            path5.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path5.position,
                destination: path5.bounds.rightCenter
            };


 
        
            /* */intersect(path5, path1);
            intersections = path5.getIntersections(path1);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[0].point;
            console.log("position>", position);
            path6 = new Path.Circle(position, mainRadius);
            path6.opacity = globalOpacity;
            path6.strokeColor = globalStrokeColor;
            path6.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path6.position,
                destination: path6.bounds.rightCenter
            };
            
        

            /* */intersect(path6, path1);
            intersections = path6.getIntersections(path1);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[0].point;
            console.log("position>", position);
            path7 = new Path.Circle(position, mainRadius);
            //path7 = path7.subtract(path3);
            path7.opacity = globalOpacity;
            path7.strokeColor = globalStrokeColor;
            path7.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path7.position,
                destination: path7.bounds.rightCenter
            };
        
        
        
            /* */intersect(path2, path3);
            intersections = path2.getIntersections(path3);
            if (intersections.length > 2) {
                intersections = [intersections[0], intersections[2]];
            }
            position = intersections[1].point;
            console.log("position>", position);
            path8 = new Path.Circle(position, mainRadius);
            //path8 = path2.subtract(path3).subtract(path4);
            path8.opacity = globalOpacity;
            path8.strokeColor = globalStrokeColor;
            path8.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: path2.position,
                destination: path2.bounds.rightCenter
            };
        

        var flowerGroup1 = new Group();
        flowerGroup1.addChild(path2);
        flowerGroup1.addChild(path3);
        flowerGroup1.addChild(path4);
        flowerGroup1.addChild(path5);
        flowerGroup1.addChild(path6);
        flowerGroup1.addChild(path7);
        flowerGroup1.addChild(path8);
        
        flowerGroup1.strokeWidth = globalStrokeWidth;
        flowerGroup1.blendMode = globalBlendMode;

        
        
        
            console.log("globalStrokeWidth> ", globalStrokeWidth);
            globalStrokeWidth /=  2;
            globalOpacity /=  2;
            console.log("globalStrokeWidth2> ", globalStrokeWidth);
/******
 * BLUE GROUP
 * 
 * */       
        /* */intersect(path2, path3);
        intersections = path2.getIntersections(path3);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path9 = new Path.Circle(position, mainRadius);
        path9.opacity = globalOpacity;
        path9.strokeColor = globalStrokeColor;
        path9.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path9.position,
            destination: path9.bounds.rightCenter
        };
        
        
        
        /* */intersect(path3, path4);
        intersections = path3.getIntersections(path4);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path10 = new Path.Circle(position, mainRadius);
        path10.opacity = globalOpacity;
        path10.strokeColor = globalStrokeColor;
        path10.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path10.position,
            destination: path10.bounds.rightCenter
        };
        
        
        
        /* */intersect(path4, path5);
        intersections = path4.getIntersections(path5);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path11 = new Path.Circle(position, mainRadius);
        path11.opacity = globalOpacity;
        path11.strokeColor = globalStrokeColor;
        path11.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path11.position,
            destination: path11.bounds.rightCenter
        };
        
        
        
        /* */intersect(path5, path6);
        intersections = path5.getIntersections(path6);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path12 = new Path.Circle(position, mainRadius);
        path12.opacity = globalOpacity;
        path12.strokeColor = globalStrokeColor;
        path12.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path12.position,
            destination: path12.bounds.rightCenter
        };
        
   
        
        /* */intersect(path6, path7);
        intersections = path6.getIntersections(path7);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path13 = new Path.Circle(position, mainRadius);
        path13.opacity = globalOpacity;
        path13.strokeColor = globalStrokeColor;
        path13.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path13.position,
            destination: path13.bounds.rightCenter
        };
        
        
   /* */     
        /* */intersect(path7, path2);
        intersections = path7.getIntersections(path2);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path14 = new Path.Circle(position, mainRadius);
        path14.opacity = globalOpacity;
        path14.strokeColor = globalStrokeColor;
        path14.fillColor = {
            gradient: {
                stops: [
                    ['green', 0.0],
                    ['blue', 1]
                ],
                radial: true
            },
            origin: path14.position,
            destination: path14.bounds.rightCenter
        };
        
        
        
        
        
                var flowerGroup2 = new Group();
        flowerGroup2.addChild(path9);
        flowerGroup2.addChild(path10);
        flowerGroup2.addChild(path11);
        flowerGroup2.addChild(path12);
        flowerGroup2.addChild(path13);
        flowerGroup2.addChild(path14);
        
        flowerGroup2.strokeWidth = globalStrokeWidth;
        flowerGroup2.blendMode = globalBlendMode;
        
        
        
        
            console.log("globalStrokeWidth> ", globalStrokeWidth);
            globalStrokeWidth /=  2;
            globalOpacity /=  2;
            console.log("globalStrokeWidth2> ", globalStrokeWidth);
/******
 * PURPLE GROUP
 * 
 * */       
        /* */intersect(path14, path9);
        intersections = path14.getIntersections(path9);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path15 = new Path.Circle(position, mainRadius);
        path15.opacity = globalOpacity;
        path15.strokeColor = globalStrokeColor;
        path15.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path15.position,
            destination: path15.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path9, path10);
        intersections = path9.getIntersections(path10);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path16 = new Path.Circle(position, mainRadius);
        path16.opacity = globalOpacity;
        path16.strokeColor = globalStrokeColor;
        path16.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path16.position,
            destination: path16.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path10, path11);
        intersections = path10.getIntersections(path11);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path17 = new Path.Circle(position, mainRadius);
        path17.opacity = globalOpacity;
        path17.strokeColor = globalStrokeColor;
        path17.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path17.position,
            destination: path17.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path11, path12);
        intersections = path11.getIntersections(path12);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path18 = new Path.Circle(position, mainRadius);
        path18.opacity = globalOpacity;
        path18.strokeColor = globalStrokeColor;
        path18.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path18.position,
            destination: path18.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path12, path13);
        intersections = path12.getIntersections(path13);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path19 = new Path.Circle(position, mainRadius);
        path19.opacity = globalOpacity;
        path19.strokeColor = globalStrokeColor;
        path19.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path19.position,
            destination: path19.bounds.rightCenter
        };
        
       
        

        /* */intersect(path13, path14);
        intersections = path13.getIntersections(path14);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path20 = new Path.Circle(position, mainRadius);
        path20.opacity = globalOpacity;
        path20.strokeColor = globalStrokeColor;
        path20.fillColor = {
            gradient: {
                stops: [
                    ['blue', 0.0],
                    ['purple', 1]
                ],
                radial: true
            },
            origin: path20.position,
            destination: path20.bounds.rightCenter
        };
        

/* */
        
        
        var flowerGroup3 = new Group();
        flowerGroup3.addChild(path15);
        flowerGroup3.addChild(path16);
        flowerGroup3.addChild(path17);
        flowerGroup3.addChild(path18);
        flowerGroup3.addChild(path19);
        flowerGroup3.addChild(path20);
/* */        
        flowerGroup3.strokeWidth = globalStrokeWidth;
        flowerGroup3.blendMode = globalBlendMode;
       
        
        
        
            console.log("globalStrokeWidth> ", globalStrokeWidth);
            globalStrokeWidth /=  2;
            globalOpacity /=  2;
            console.log("globalStrokeWidth2> ", globalStrokeWidth);
/******
 * BLACK GROUP
 * 
 * */       
        /* */intersect(path9, path15);
        intersections = path9.getIntersections(path15);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path21 = new Path.Circle(position, mainRadius);
        path21.opacity = globalOpacity;
        path21.strokeColor = globalStrokeColor;
        path21.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path21.position,
            destination: path21.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path9, path16);
        intersections = path9.getIntersections(path16);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path22 = new Path.Circle(position, mainRadius);
        path22.opacity = globalOpacity;
        path22.strokeColor = globalStrokeColor;
        path22.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path22.position,
            destination: path22.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path10, path16);
        intersections = path10.getIntersections(path16);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path23 = new Path.Circle(position, mainRadius);
        path23.opacity = globalOpacity;
        path23.strokeColor = globalStrokeColor;
        path23.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path23.position,
            destination: path23.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path10, path17);
        intersections = path10.getIntersections(path17);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path24 = new Path.Circle(position, mainRadius);
        path24.opacity = globalOpacity;
        path24.strokeColor = globalStrokeColor;
        path24.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path24.position,
            destination: path24.bounds.rightCenter
        };
        
        
        
        
        /* */intersect(path11, path17);
        intersections = path11.getIntersections(path17);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path25 = new Path.Circle(position, mainRadius);
        path25.opacity = globalOpacity;
        path25.strokeColor = globalStrokeColor;
        path25.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path25.position,
            destination: path25.bounds.rightCenter
        };
        
        

        
        /* */intersect(path11, path18);
        intersections = path11.getIntersections(path18);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path26 = new Path.Circle(position, mainRadius);
        path26.opacity = globalOpacity;
        path26.strokeColor = globalStrokeColor;
        path26.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path26.position,
            destination: path26.bounds.rightCenter
        };
        
        

        
        /* */intersect(path12, path18);
        intersections = path12.getIntersections(path18);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path27 = new Path.Circle(position, mainRadius);
        path27.opacity = globalOpacity;
        path27.strokeColor = globalStrokeColor;
        path27.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path27.position,
            destination: path27.bounds.rightCenter
        };
        
        

        
        /* */intersect(path12, path19);
        intersections = path12.getIntersections(path19);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path28 = new Path.Circle(position, mainRadius);
        path28.opacity = globalOpacity;
        path28.strokeColor = globalStrokeColor;
        path28.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path28.position,
            destination: path28.bounds.rightCenter
        };
        
        

        
        /* */intersect(path13, path19);
        intersections = path13.getIntersections(path19);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[1].point;
        path29 = new Path.Circle(position, mainRadius);
        path29.opacity = globalOpacity;
        path29.strokeColor = globalStrokeColor;
        path29.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path29.position,
            destination: path29.bounds.rightCenter
        };
        
        

        
        /* */intersect(path13, path20);
        intersections = path13.getIntersections(path20);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path30 = new Path.Circle(position, mainRadius);
        path30.opacity = globalOpacity;
        path30.strokeColor = globalStrokeColor;
        path30.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path30.position,
            destination: path30.bounds.rightCenter
        };
        
        

        
        /* */intersect(path14, path20);
        intersections = path14.getIntersections(path20);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path31 = new Path.Circle(position, mainRadius);
        path31.opacity = globalOpacity;
        path31.strokeColor = globalStrokeColor;
        path31.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path31.position,
            destination: path31.bounds.rightCenter
        };
        
        

        
        /* */intersect(path14, path15);
        intersections = path14.getIntersections(path15);
        if (intersections.length > 2) {
            intersections = [intersections[0], intersections[2]];
        }
        position = intersections[0].point;
        path32 = new Path.Circle(position, mainRadius);
        path32.opacity = globalOpacity;
        path32.strokeColor = globalStrokeColor;
        path32.fillColor = {
            gradient: {
                stops: [
                    ['purple', 0.0],
                    ['white', 1]
                ],
                radial: true
            },
            origin: path32.position,
            destination: path32.bounds.rightCenter
        };
        
        
        
        
        
    

/* */
        
        
        var flowerGroup3 = new Group();
        flowerGroup3.addChild(path21);
        flowerGroup3.addChild(path22);
        flowerGroup3.addChild(path23);
        flowerGroup3.addChild(path24);
        flowerGroup3.addChild(path25);
        flowerGroup3.addChild(path26);
        flowerGroup3.addChild(path27);
        flowerGroup3.addChild(path28);
        flowerGroup3.addChild(path29);
        flowerGroup3.addChild(path30);
        flowerGroup3.addChild(path31);
        flowerGroup3.addChild(path32);
/* */        
        flowerGroup3.strokeWidth = globalStrokeWidth;
        flowerGroup3.blendMode = globalBlendMode;
       
        

   

        
        
        
        
       
/*   ***** */
        
/*        intersect(path3, path4);
        intersect(path4, path5);
        intersect(path5, path6);
        intersect(path6, path7);
        intersect(path7, path8);
        
        
        
        
        
        
 /*       */                      /*
        flowerGroup1.addChild(path5);
        flowerGroup1.addChild(path6);
        flowerGroup1.addChild(path7);
        flowerGroup1.addChild(path8);
        */
        /*
        var iterations = 1;
        var list = [path1, path2];
        var circleContour = function(list) {
            var pathA = list[list.length - 1]; // get last added
            console.log(iterations + ". pathA", pathA);
            console.log(iterations + ". list[0]", list[0]);
            // look for intersections with the main path
            var getIntersections = pathA.getIntersections(list[0]);
            
            // gather unique intersection paths
            var result;
            getIntersections.forEach(function (intersection, index) {
                var point = intersection.point;
                
                result = list.filter(function( obj ) {
                    return obj.point.equals(point) ? obj : false;
                });
            });
            
            
            
            
            
            
            var intersectionGroup = new Group();
            for(var i = 0; i < getIntersections.length; i++) {
                var intersectionPath = new Path.Circle({
                    center: getIntersections[i].point,
                    radius: 4,
                    fillColor: 'red'
                });
                intersectionGroup.addChild(intersectionPath);
            }
            console.log("getIntersections (" + getIntersections.length + ")> ", getIntersections);
            var position = getIntersections[0].point;
            console.log("position>", position);
            var pathNew = new Path.Circle(position, mainRadius);
            pathNew.strokeWidth = globalStrokeWidth;
            pathNew.opacity = globalOpacity;
            pathNew.strokeColor = '#eee'; //Colourize();
            pathNew.fillColor = {
                gradient: {
                    stops: [
                        ['red', 0.0],
                        ['black', 0.50],
                        ['green', 1]
                    ],
                    radial: true
                },
                origin: pathNew.position,
                destination: pathNew.bounds.rightCenter
            };
            var pristine = list.push(pathNew);
        };
        
        console.log("--- ITERATIONS BEGIN ---");
        
        do {
            circleContour(list);
        } while (iterations--);
        
        console.log("--- ITERATIONS END ---");
        */
        // -----------------
        // 
        // ////////////////////////////
 /*
        position = paper.view.center;
        console.log("position>", position);
        path1 = new Path.Circle(position, mainRadius);
        path1.strokeWidth = 10;
        path1.opacity = 0.618;
        path1.strokeColor = globalStrokeColor;
        path1.fillColor = {
            gradient: {
                stops: [
                    ['black', 0.0],
                    ['red', 1]
                ],
                radial: true
            },
            origin: path1.position,
            destination: path1.bounds.rightCenter
        };
*/
        // ////////////////////////////

    };
    
    jazzcript(paper.view.center);
})();
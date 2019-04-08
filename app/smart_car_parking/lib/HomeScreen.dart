import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class HomeScreen extends StatefulWidget{

  @override
  HomeScreenState createState() => HomeScreenState();
}


class HomeScreenState extends State<HomeScreen>{

  List<Tower> towers = new List();
  int totalSize;
  int numberOfTowers;

  Future<void> getData() async {

    await Firestore.instance.collection("towersInfo").document("totalSize").get().then((value){
      totalSize = value['occupancy'];
    });
    
    await Firestore.instance.collection("towersInfo").document("numberOfTowers").get().then((value){
      numberOfTowers = value['numberOfTowers'];
    });

    await Firestore.instance.collection("towersInfo").document("towers").get().then((value) {
      for(int i=0;i<numberOfTowers;i++){
        int location = value.data['towers'][i]['location'];
        int occupied = value.data['towers'][i]['occupied'];
        int availableSlots = value.data['towers'][i]['availableSlots'];
        setState(() {
          towers.add(new Tower(location,availableSlots,occupied));
        });
      }
    });
  }

  @override
  void initState(){
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Padding(
      padding: const EdgeInsets.all(18.0),
      child: towers.length > 0 ?OrientationBuilder(
              builder:(context,orientation)=> GridView.builder(
            itemCount: towers.length,
            itemBuilder: (itemBuilder, index) => towers.length <=0 ? CircularProgressIndicator() : GridItem(towers[index]),
            gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: orientation == Orientation.portrait ? 2 : 3),
        ),
      ): Center(child: CircularProgressIndicator(backgroundColor: Colors.blue,)),
    );
  }

}

class Tower {
  int towerID;
  int availableSlots;
  int occupied;
  Tower(this.towerID,this.availableSlots,this.occupied);
}

class GridItem extends StatefulWidget {
  Tower tower;

  GridItem(this.tower);

  @override
  _GridItemState createState() => _GridItemState();
}

class _GridItemState extends State<GridItem> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
          onTap: (){
            print(widget.tower.towerID.toString() + "Clicked ");
          },
          child: Container(
          decoration: BoxDecoration(color: Color(0xff00cc99),borderRadius: BorderRadius.circular(20)),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(widget.tower.towerID.toString(),style: TextStyle(fontSize: 50),),
              Text("Available: "+ widget.tower.availableSlots.toString(), style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold)),
              Text("Occupied: "+ widget.tower.occupied.toString(), style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ),
    );
  }
}
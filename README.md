# icaque-front

## prerequisite
You must be with nodejs 3.*.* installed globally in order to make sure that gulp tasks will be well executed

## Commands

```
npm run make-dev
```
This command will start by install all the nodejs and bower vendors to the project then transform and copy `/src` files into `/web` folder.

```
npm run start-dev
```
This command will start a localserver on `/web` folder then watch `/src` files changes to transform them and copy them into `/web` folder. It will also auto reload your pages at any change detected

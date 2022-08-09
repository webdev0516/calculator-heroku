import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

const calcMain = (req: Request, res: Response) => {
    const { total, next, operation } = req.query as any;
    
    let totalNum: number | null = isNaN(total) ? null : Number(total);
    let nextNum: number | null = isNaN(next) ? null : Number(next);
    
    if (nextNum == null) {
        res.send(totalNum ? totalNum.toString() : "0");
        return;
    }
    switch (operation) {
        case "plus":
            res.send((totalNum as number + nextNum).toString());
        case "minus":
            res.send((totalNum as number - nextNum).toString());
        case "times":
            res.send((totalNum as number * nextNum).toString());
        case "divide":
            res.send((totalNum as number / nextNum).toString());
        default: {
            res.send(nextNum.toString());
        }
    }
};

router.get('/', calcMain);

export default router;